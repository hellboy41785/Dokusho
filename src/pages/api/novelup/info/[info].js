import { scrapeNovelUpInfo } from "@/scraper/novelup/info";
const fs = require("fs");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { info } = req.query;
    try {
      const data = await scrapeNovelUpInfo({ slug: info });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
