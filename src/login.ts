import { delay } from "./utils";
let webPage: any;

export async function login(page: any, googleUsername: string, googlePassword: string) {
  webPage = page;
  await enterEmailAddress(googleUsername);
  await enterEmailPassword(googlePassword);
}

async function enterEmailAddress(mail: string) {
  await webPage.type('input[type="email"]', mail);
  await webPage.keyboard.press("Enter");
  await delay(4500);
}

async function enterEmailPassword(password: string) {
  await webPage.type('input[type="password"]', password);
  await webPage.keyboard.press("Enter");
  await finishedLogin();
}

async function finishedLogin() {
  while (1) {
    const url = await webPage.url();
    const urlAfterLoginFinished = "https://www.google.com/";
    if (url == urlAfterLoginFinished) {
      break;
    }
    await delay(1500);
  }
}
