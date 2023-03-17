import { scrapeNovelUpAllChapter } from "@/scraper/novelup/allChapter";
const fs = require("fs");



export default async function handler(req, res) {
  if (req.method === "GET") {
    const { allchapcherrio } = req.query;
    try {
      const data = await scrapeNovelUpAllChapter({ slug: allchapcherrio });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
