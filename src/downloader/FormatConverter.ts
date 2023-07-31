import ffmpeg from "ffmpeg-static";
import cp from "child_process";
import fs from "fs";

import { YtdlMp3Error } from "./utils";

export class FormatConverter {
  private readonly ffmpegBinary: string;

  constructor() {
    if (!ffmpeg) {
      throw new YtdlMp3Error("Failed to resolve ffmpeg binary");
    }
    this.ffmpegBinary = ffmpeg;
  }

  videoToAudio(videoData: Buffer, outputFile: string): boolean {
    if (fs.existsSync(outputFile)) {
      return false;
    }
    cp.execSync(`${this.ffmpegBinary} -loglevel 24 -i pipe:0 -vn -sn -c:a mp3 -ab 192k ${outputFile}`, {
      input: videoData,
    });
    return true;
  }
}
