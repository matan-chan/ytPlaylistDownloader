import { delay, scroll } from "./utils";
import { playlistUrl } from "./data";

let webPage: any;

export async function getAllVideosUrls(page: any): Promise<string[]> {
  webPage = page;
  await page.goto(playlistUrl);
  const videos: [] = await getAllVideosOnPlaylist();
  // @ts-ignore
  const videosUrls: string[] = await Promise.all(videos.map(async (video) => await webPage.evaluate((ss) => ss.href, video)));
  return videosUrls;
}

export async function getAllVideosOnPlaylist() {
  const playlistLength = await extractPlaylistSize();
  await scrollThroughPlaylist(playlistLength);
  const videos: [] = await webPage.$$("a.compact-media-item-image");
  console.log(`${videos.length}/${playlistLength} videos where loaded from this playlist\n`);
  return videos;
}

export async function scrollThroughPlaylist(playlistLength: number) {
  while (1) {
    await scroll(webPage);
    const videosLoadedSoFar: [] = await webPage.$$("a.compact-media-item-image");
    if (videosLoadedSoFar.length == playlistLength) {
      break;
    }
  }
  await delay(2000);
}

export async function extractPlaylistSize(): Promise<number> {
  const playlistLengthContainer = await webPage.$("span.amsterdam-playlist-stat span.yt-core-attributed-string");
  // @ts-ignore
  const playlistLengthAndWords: string = await webPage.evaluate((el) => el.textContent, playlistLengthContainer);
  const playlistLength: number = Number(playlistLengthAndWords.match(/\d+/)![0]);
  return playlistLength;
}
