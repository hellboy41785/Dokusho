import { scrapeNovelUpSearch } from "@/scraper/novelup/search";
const fs = require("fs");



export default async function handler(req, res) {
  if (req.method === "GET") {
    const { search } = req.query;
    try {
      const data = await scrapeNovelUpSearch ({ value: search });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
