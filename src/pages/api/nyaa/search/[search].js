const fs = require("fs");
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {executablePath} = require('puppeteer')
const url = `https://nyaa.si`;


const scrapeData = async ({ search }) => {
  try {
    await puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(`${url}/?f=0&c=3_0&q=${search}`, {
      waitUntil: "domcontentloaded",
    });
    const items = await page.evaluate(() => {
      const item = document.querySelectorAll(".default")

      const nyaaResult = [] 
      Array.from(item).map((el) => {
        const result = {name:"",size:"",torrent:"",magnet:"",date:"",seeder:"",lecher:"",completed:""}
        const tdElements = el.querySelectorAll("td")
        const aName = tdElements[1].querySelectorAll("a")
        const download = tdElements[2].querySelectorAll("a")
        
        result.name = aName.length  === 1 ? aName[0].textContent : aName[1].textContent 
        result.size = tdElements[3].textContent
        result.torrent = download[0].href
        result.magnet = download[1].href.replace("https://nyaa.si/","")
        result.date = tdElements[4].textContent
        result.seeder = tdElements[5].textContent
        result.lecher = tdElements[6].textContent
        result.completed = tdElements[7].textContent
        nyaaResult.push(result)
      })
      return nyaaResult
    })
    return items
    
  } catch (err) {
    console.log("error :" + err);
    return {Error: err.message}
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { search } = req.query;
    try {
      const data = await scrapeData({ search: search });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
