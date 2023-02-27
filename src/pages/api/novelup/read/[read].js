const fs = require("fs");
const { extractFromHtml } = require('@extractus/article-extractor')

const url = `https://www.novelupdates.com/extnu`;

const scrapeData = async ({ id }) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const html = await res.text();

    const article = await extractFromHtml(html, url)
    return article;
  } catch (err) {
    console.log("error: " + err.message);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { read } = req.query;
    try {
      const data = await scrapeData({ id: read });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
