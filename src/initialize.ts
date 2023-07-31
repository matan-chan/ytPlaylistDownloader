import { gotoSettings, loginUrl, ua } from "./data";

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

export async function initializeBrowser() {
  const browser = puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-gpu", "--enable-webgl", "--window-size=1920,1080"],
  });
  return browser;
}

export async function initializePage(browser: any) {
  const [page] = await browser.pages();
  await page.setUserAgent(ua);
  await page.goto(loginUrl, gotoSettings);
  return page;
}
