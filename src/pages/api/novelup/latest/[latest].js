import {scrapeNovelUpLatest} from "../../../../scraper/novelup/latest"
const fs = require("fs");





export default async function handler(req, res) {
  if (req.method === "GET") {
    const { latest } = req.query;
    try {
      const data = await scrapeNovelUpLatest({page:latest});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
