import { scrapeNovelUpChapters } from "@/scraper/novelup/chapters";
const fs = require("fs");


export default async function handler(req, res) {
  if (req.method === "GET") {
    const { chapters } = req.query;
    try {
      const data = await scrapeNovelUpChapters({ slug: chapters[0], page: chapters[1] });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
