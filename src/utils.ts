import { outputDirWithMetadata, outputDirWithoutMetadata } from "./data";
import fs from "fs";

export function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export function randomDelay(minDelay: number = 200, delayDalta: number = 1000) {
  let msDelay = Math.floor(Math.random() * delayDalta + minDelay);
  return delay(msDelay);
}

export async function scroll(page: any) {
  await page.mouse.wheel({ deltaY: 1500 });
  await delay(400);
}

export function ensureDirs() {
  if (!fs.existsSync(outputDirWithMetadata)) {
    fs.mkdirSync(outputDirWithMetadata);
  }
  if (!fs.existsSync(outputDirWithoutMetadata)) {
    fs.mkdirSync(outputDirWithoutMetadata);
  }
}

export type DownloadState = "Success" | "SuccessNoMetadata" | "Failed";
