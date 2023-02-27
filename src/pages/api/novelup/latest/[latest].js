const cheerio = require("cheerio");
const fs = require("fs");

const url = `https://www.novelupdates.com/latest-series`;

const scrapeData = async ({page}) => {
  try {
    const res = await fetch(`${url}/?st=1&pg=${page}`);
    const data = await res.text();

    const $ = cheerio.load(data);

    const latests = $(".search_main_box_nu ");

    const series = [];
    latests.each((idx, el) => {
      const serie = { title: "", id: "",chapter:"", updated:"",reader:"",rating:"",country:"",img:""};
      serie.title = $(el).find(".search_title").text();

      serie.id = $(el)
        .find(".search_title a")
        .attr("href")
        .replace("https://www.novelupdates.com/series/", "");

      serie.chapter = $(el).find(".search_stats span:first").text().replace(/Chapters/g,'')
      serie.updated = $(el).find(".search_stats span:last").text()
      serie.reader = $(el).find(".search_stats span:eq(2)").text().replace(/Readers/g,'')
      serie.rating = $(el).find(".search_ratings:last").text().match(/\(([^)]+)\)/)[1]
      serie.rating = $(el).find(".search_ratings").text().match(/\(([^)]+)\)/)[1]
      serie.country = $(el).find(".search_ratings span").text()
      serie.img = $(el).find(".search_img_nu  img").attr('src')

      // console.log($(el).find(".search_stats span:first").text());
      series.push(serie);
    });

    return series;
  } catch (err) {
    console.log("error: " + err.message);
  }
};



export default async function handler(req, res) {
  if (req.method === "GET") {
    const { latest } = req.query;
    try {
      const data = await scrapeData({page:latest});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
