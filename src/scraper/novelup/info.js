const cheerio = require("cheerio");


const url = `https://www.novelupdates.com/series`;

export const scrapeNovelUpInfo = async ({ slug }) => {
  try {
    const res = await fetch(`${url}/${slug}`);
    const data = await res.text();

    const $ = cheerio.load(data);

    const info = $(".w-blog-content");
    const novelInfo = {
      title: "",
      id: "",
      type: "",
      img: "",
      associatedNames: [],
      genres: [],
      tags: [],
      rating: "",
      language: "",
      authors: [],
      artists: [],
      year: "",
      status: "",
      licensed: "",
      completelyTranslated: "",
      englishPublisher: "",
      description: "",
      recommendation: [],
      reviews: [],
      chapterTotalPage: "",
    };

    // Title

    novelInfo.title = info.find(".seriestitlenu").text();
    novelInfo.type = info
      .find(".wpb_text_column #showtype")
      .text()
      .replace(/\n/g, "");
    // ID
    novelInfo.id = slug;
    // Image
    novelInfo.img = info.find(".seriesimg > img").attr("src");
    // AssociateNames
    novelInfo.associatedNames = info
      .find("#editassociated ")
      .contents()
      .filter((i, el) => el.name === "br")
      .map((i, el) => el.nextSibling.nodeValue.trim())
      .get();

    const firstName = info
      .find("#editassociated")
      .contents()[0]
      .nodeValue.trim();
    novelInfo.associatedNames.unshift(firstName);

    // Genre

    info.find("#seriesgenre > a.genre").each((idx, el) => {
      const genre = { name: "", description: "", id: "" };
      genre.name = $(el).text();
      genre.description = $(el).attr("title");
      genre.id = $(el).prop("gid");
      novelInfo.genres.push(genre);
    });
    // Tags
    info.find("#showtags > a.genre").each((idx, el) => {
      const tag = { name: "", description: "", id: "" };
      tag.name = $(el).text();
      tag.description = $(el).attr("title");
      tag.id = $(el)
        .attr("href")
        .replace("https://www.novelupdates.com/stag/", "");
      novelInfo.tags.push(tag);
    });
    // Rating
    novelInfo.rating = info.find(".uvotes").text();
    // Language
    novelInfo.language = info.find("#showlang a").text();

    // Authors
    info.find("#showauthors > a").each((idx, el) => {
      const author = { name: "", id: "" };
      author.name = $(el).text();
      author.id = $(el)
        .attr("href")
        .replace("https://www.novelupdates.com", "");
      novelInfo.authors.push(author);
    });

    // Artists

    info.find("#showartists a").each((idx, el) => {
      const artist = { name: "", id: "" };
      artist.name = $(el).text();
      artist.id = $(el)
        .attr("href")
        .replace("https://www.novelupdates.com", "");
      novelInfo.artists.push(artist);
    });

    // Year
    novelInfo.year = info.find("#edityear").text().replace(/\n/g, "");

    // Status
    novelInfo.status = info.find("#editstatus").text();
    //  Licensed
    novelInfo.licensed = info.find("#showlicensed").text().replace(/\n/g, "");
    // Completely Translated
    novelInfo.completelyTranslated = info
      .find("#showtranslated")
      .text()
      .replace(/\n/g, "");
    // English Publisher
    novelInfo.englishPublisher = info
      .find("#showepublisher > .seriesna")
      .text()
      .replace(/\n/g, "");
    // Description
    novelInfo.description = info.find("#editdescription").text();

    // Recommendation
    info.find(".wpb_wrapper > a.genre").each((idx, el) => {
      const recom = { title: "", id: "" };
      recom.title = $(el).text();
      recom.id = $(el)
        .attr("href")
        .replace("https://www.novelupdates.com/series/", "");

      novelInfo.recommendation.push(recom);
    });

    // Review
    const reviews = $(".w-comments-list");
    reviews.find(".w-comments-item").each((idx, el) => {
      const review = { user: "", id: "", date: "", img: "", comment: "" };
      review.user = $(el).find("#revname").text();
      review.id = $(el)
        .find("#revname")
        .attr("href")
        .replace("https://www.novelupdates.com/user/", "");
      review.date = $(el)
        .find(
          ".w-comments-item-meta-new > table > tbody > tr > td:last > div:first"
        )
        .text();
      review.img = $(el).find(".rev_left > img").attr("src");
      review.comment = $(el).find(".w-comments-item-text").text();
      novelInfo.reviews.push(review);
    });

    // Total Page
    const totalPage = info.find(".digg_pagination ").html();
    novelInfo.chapterTotalPage =
      totalPage === null
        ? "1"
        : info.find(".digg_pagination ").children("a:last").prev().text();

    return novelInfo;
  } catch (err) {
    console.log("error: " + err.message);
  }
};
