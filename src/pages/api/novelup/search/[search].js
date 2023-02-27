const cheerio = require("cheerio");
const fs = require("fs");

const url = `https://www.novelupdates.com`;

const scrapeData = async ({ value }) => {
  try {
    const res = await fetch(`${url}/?s=${value}`);
    const data = await res.text();

    const $ = cheerio.load(data);

    const search = $(".search_main_box_nu ");

    const searchResult = [];
    search.each((idx, el) => {
      const searchInfo = {
        title: "",
        id: "",
        chapter: "",
        updated: "",
        reader: "",
        rating: "",
        country: "",
        img: "",
      };
      searchInfo.title = $(el).find(".search_title").text();

      searchInfo.id = $(el)
        .find(".search_title a")
        .attr("href")
        .replace("https://www.novelupdates.com/series/", "");

      searchInfo.chapter = $(el)
        .find(".search_stats span:first")
        .text()
        .replace(/Chapters/g, "");
      searchInfo.updated = $(el).find(".search_stats span:last").text();
      searchInfo.reader = $(el)
        .find(".search_stats span:eq(2)")
        .text()
        .replace(/Readers/g, "");
      searchInfo.rating = $(el)
        .find(".search_ratings:last")
        .text()
        .match(/\(([^)]+)\)/)[1];
      searchInfo.rating = $(el)
        .find(".search_ratings")
        .text()
        .match(/\(([^)]+)\)/)[1];
      searchInfo.country = $(el).find(".search_ratings span").text();
      searchInfo.img = $(el).find(".search_img_nu  img").attr("src");

      // console.log($(el).find(".search_stats span:first").text());
      searchResult.push(searchInfo);
    });

    return searchResult;
  } catch (err) {
    console.log("error: " + err.message);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { search } = req.query;
    try {
      const data = await scrapeData({ value: search });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
