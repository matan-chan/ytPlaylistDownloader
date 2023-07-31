import { Downloader } from "./downloader/Downloader";
import { downloaderOptions } from "./data";
import { DownloadState } from "./utils";

const ytdl = require("ytdl-core");

export class DownloadHub {
  success = 0;
  successNoMetadata = 0;
  failed = 0;
  videosUrls: string[];

  constructor(videosUrls: string[]) {
    this.videosUrls = videosUrls;
  }

  async downloadVideos() {
    for (let i = 0; i < this.videosUrls.length; i++) {
      await this.attemptToDownloadVideo(this.videosUrls[this.videosUrls.length - i - 1]);
    }
  }

  async attemptToDownloadVideo(downloadUrl: string) {
    try {
      await this.downloadVideo(downloadUrl);
    } catch (error) {
      this.logHub("Failed", downloadUrl);
    }
  }

  async downloadVideo(downloadUrl: string) {
    const videoTitle = await this.getVideoTitle(downloadUrl);
    const downloadState: DownloadState = await this.downloaderWrapper(downloadUrl, videoTitle);
    this.logHub(downloadState, videoTitle);
  }

  async downloaderWrapper(downloadUrl: string, videoTitle: string): Promise<DownloadState> {
    const downloader = await new Downloader(downloaderOptions);
    const withMetadata: DownloadState = await downloader.downloadSong(downloadUrl, videoTitle);
    return withMetadata;
  }

  async getVideoTitle(downloadUrl: string): Promise<string> {
    const videoId = ytdl.getURLVideoID(downloadUrl);
    const videoInfo = await ytdl.getInfo(videoId);
    const videoTitle = this.removeIlligalFileCaracters(videoInfo.videoDetails.title);
    return videoTitle;
  }

  logHub(downloadState: DownloadState, videoTitle: string) {
    this.clearLastLog();
    switch (downloadState) {
      case "Failed":
        this.failed++;
        this.logFailedDownload(videoTitle);
        break;

      case "Success":
        this.logSuccessWithMetadataDownload(videoTitle);
        this.success++;
        break;

      case "SuccessNoMetadata":
        this.logSuccessWithoutMetadataDownload(videoTitle);
        this.successNoMetadata++;
        break;
    }

    this.clearLastLog();

    const sum: number = this.failed + this.success + this.successNoMetadata;
    process.stdout.write(
      `${sum}/${this.videosUrls.length} videos where downloaded success with metadata: ${this.success} without: ${this.successNoMetadata} failed: ${this.failed}`
    );
  }

  logSuccessWithMetadataDownload(videoTitle: string) {
    this.clearLastLog();
    console.log("\u001b[" + 42 + "m" + `${videoTitle} download Completed` + "\u001b[0m");
  }

  logSuccessWithoutMetadataDownload(videoTitle: string) {
    this.clearLastLog();
    console.log("\u001b[" + 43 + "m" + `${videoTitle} download Completed` + "\u001b[0m");
  }

  logFailedDownload(downloadUrl: string) {
    this.clearLastLog();
    console.log("\u001b[" + 41 + "m" + `faild to download ${downloadUrl}` + "\u001b[0m");
  }

  clearLastLog() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }

  removeIlligalFileCaracters(videoTiltle: string): string {
    videoTiltle = videoTiltle.replace(/[/\\?%*:|"<>]/g, "");
    return videoTiltle;
  }
}
