const cheerio = require("cheerio");
const url = `https://www.novelupdates.com/series`;
export const scrapeNovelUpAllChapter = async ({ slug }) => {
  try {
    const res = await fetch(`${url}/${slug}`);
    const html = await res.text();
    const loadedCheerio = cheerio.load(html);

    const novelId = loadedCheerio("input#mypostid").attr("value");
    let formData = new FormData();
    formData.append("action", "nd_getchapters");
    formData.append("mygrr", 0);
    formData.append("mypostid", parseInt(novelId, 10));
    const data = await fetch(
      "https://www.novelupdates.com/wp-admin/admin-ajax.php",
      {
        method: "POST",
        body: formData,
      }
    );
    const text = await data.text();
    const $ = cheerio.load(text);

    const chapters = $("li.sp_li_chp");

    const allChapters = {
      slug: slug,
      chapters: [],
    };

    chapters.each((idx, el) => {
      const chapter = { id: "", ch: "" };
      chapter.id = $(el).children("a:last").attr("href").replace("//www.novelupdates.com/extnu/","")
      chapter.ch = $(el).children("a:last").children("span").text()
      allChapters.chapters.push(chapter);
    });

    return allChapters;
  } catch (err) {
    console.log("error: " + err.message);
  }
};