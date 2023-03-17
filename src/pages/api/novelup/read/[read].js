import { scrapeNovelUpRead } from "@/scraper/novelup/read";
const fs = require("fs");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { read } = req.query;
    try {
      const data = await scrapeNovelUpRead({ id: read });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
