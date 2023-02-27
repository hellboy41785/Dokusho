const fs = require("fs");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

const url = `https://www.novelupdates.com/series`;
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-extra");
} else {
  // running locally.
  puppeteer = require("puppeteer-extra");
}
const scrapeData = async ({ slug }) => {
  try {
    await puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(`${url}/${slug}`, {
      waitUntil: "domcontentloaded",
    });

    await page.click(".my_popupreading_open");
    await page.waitForSelector(".sp_chp");

    const items = await page.evaluate(() => {
      const item = document.querySelectorAll(".sp_chp > li");
      const chapters = [];
      Array.from(item).map((el) => {
        const chapter = { id: "", ch: "" };
        const aTags = el.querySelectorAll("a");
        chapter.id = aTags[aTags.length - 1].href.replace(
          "https://www.novelupdates.com/extnu/",
          ""
        );
        chapter.ch = el.querySelector("a > span").textContent;

        chapters.push(chapter);
      });

      return chapters;
    });
    const allChapters = {
      slug: slug,
      chapters: items,
    };
    return allChapters;
  } catch (err) {
    console.log("error: " + err.message);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { allchapters } = req.query;
    try {
      const data = await scrapeData({ slug: allchapters });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
