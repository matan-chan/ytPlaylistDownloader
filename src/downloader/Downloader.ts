import { YtdlMp3Error, removeParenthesizedText } from "./utils";
import type { videoInfo as VideoInfo } from "ytdl-core";
import { FormatConverter } from "./FormatConverter";
import { SongTagsSearch } from "./SongTagsSearch";
import { DownloadState } from "../utils";
import NodeID3 from "node-id3";
import ytdl from "ytdl-core";
import path from "path";
import os from "os";
const fs = require("fs");
export interface DownloaderOptions {
  outputDirNoTag?: string;
  outputDirWithTag?: string;
}

export class Downloader {
  static defaultDownloadsDir = path.join(os.homedir(), "Downloads");

  outputDirNoTag?: string;
  outputDirWithTag?: string;

  constructor({ outputDirWithTag, outputDirNoTag }: DownloaderOptions) {
    this.outputDirWithTag = outputDirWithTag ?? Downloader.defaultDownloadsDir;
    this.outputDirNoTag = outputDirNoTag ?? Downloader.defaultDownloadsDir;
  }

  async downloadSong(url: string, videoTitle: string): Promise<DownloadState> {
    //@ts-ignore
    const videoInfo = await ytdl.getInfo(url, { requestOptions: { backoff: { inc: 10000, max: 10000 } } }).catch((error) => {
      throw new YtdlMp3Error(`Failed to fetch info for video with URL: ${url}`);
    });
    const formatConverter = new FormatConverter();
    const videoData = await this.downloadVideo(videoInfo);
    try {
      return await this.downloadWithMetadata(formatConverter, videoData, videoInfo);
    } catch (error) {
      return this.downloadWithoutMetadata(videoTitle, formatConverter, videoData);
    }
  }

  async downloadWithMetadata(formatConverter: FormatConverter, videoData: Buffer, videoInfo: VideoInfo): Promise<DownloadState> {
    const songTagsSearch = new SongTagsSearch(videoInfo.videoDetails);
    const songTags = await songTagsSearch.search();
    const outputFile = this.getDownloadPathWithTag(videoInfo.videoDetails.title);
    const doesntExistAlready = formatConverter.videoToAudio(videoData, outputFile);
    if (doesntExistAlready) {
      NodeID3.write(songTags, outputFile);
    }

    return "Success";
  }

  downloadWithoutMetadata(videoTitle: string, formatConverter: FormatConverter, videoData: Buffer): DownloadState {
    const outputFile = this.getDownloadPathWithoutTag(videoTitle);
    formatConverter.videoToAudio(videoData, outputFile);
    fs.renameSync(outputFile, "musicWithoutMetadata/" + videoTitle + ".mp3");
    return "SuccessNoMetadata";
  }

  private async downloadVideo(videoInfo: VideoInfo): Promise<Buffer> {
    const buffers: Buffer[] = [];
    const stream = ytdl.downloadFromInfo(videoInfo, {
      quality: "highestaudio",
    });
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: Buffer) => {
        buffers.push(chunk);
      });
      stream.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
      stream.on("error", (err) => {
        reject(err);
      });
    });
  }

  private getDownloadPathWithoutTag(videoTitle: string): string {
    const baseFileName = this.getBaseFileName(videoTitle);
    return path.join(this.outputDirNoTag!, baseFileName + ".mp3");
  }

  private getDownloadPathWithTag(videoTitle: string): string {
    const baseFileName = this.getBaseFileName(videoTitle);
    return path.join(this.outputDirWithTag!, baseFileName + ".mp3");
  }

  private getBaseFileName(videoTitle: string): string {
    const baseFileName = removeParenthesizedText(videoTitle)
      .replace(/\s*[([.*?[)\]$%^&#@!\- ]\s*/g, "_")
      .toLowerCase();
    return baseFileName;
  }
}
