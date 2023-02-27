const cheerio = require("cheerio");
const fs = require("fs");

const url = `https://www.novelupdates.com/series`;

const scrapeData = async ({ slug, page }) => {
  try {
    const res = await fetch(`${url}/${slug}/?pg=${page}#myTable`);
    const data = await res.text();

    const $ = cheerio.load(data);
    const chapters = $("#myTable > tbody >tr");

    const chapInfo = {
      page: "",
      totalPage: "",
      slug:slug,
      chapters:[]
    };

    chapInfo.page = page;
    //  Total Page
    const totalPage = $(".digg_pagination ").children("a:last").next().text();
    chapInfo.totalPage =
      totalPage === ""
        ? $(".digg_pagination ").children("a:last").prev().text()
        : $(".digg_pagination ").children("a:last").next().text();

    // Chapters
    chapters.each((idx,el)=>{
      const chapter = {ch:"",date:"",group:"",id:""}
      chapter.ch = $(el).find("td:last > a").text()
      chapter.date = $(el).find("td:first").text().replace("\n\t\t","")
      chapter.group = $(el).find("td:last").prev().children("a").text()
      chapter.id = $(el).find("td:last > a").attr('href').replace("//www.novelupdates.com/extnu/","")

      chapInfo.chapters.push(chapter)
    })

    //  console.log(.html())
    return chapInfo;
  } catch (err) {
    console.log("error: " + err.message);
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { chapters } = req.query;
    try {
      const data = await scrapeData({ slug: chapters[0], page: chapters[1] });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
}
