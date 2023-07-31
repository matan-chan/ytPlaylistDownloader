import { initializeBrowser, initializePage } from "./initialize";
import { getAllVideosUrls } from "./playlist";
import { DownloadHub } from "./downloadFile";
import { login } from "./login";

const prompt = require("prompt-sync")();

async function main() {
  const name = prompt("email address: ");
  const password = prompt("email password: ");
  const browser = await initializeBrowser();
  const page = await initializePage(browser);
  await login(page, name, password);
  const videosUrls: string[] = await getAllVideosUrls(page);
  await browser.close();
  const downloadHub = await new DownloadHub(videosUrls);
  await downloadHub.downloadVideos();
}

main();
