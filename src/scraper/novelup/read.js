const { extractFromHtml } = require('@extractus/article-extractor')

const url = `https://www.novelupdates.com/extnu`;

export const scrapeNovelUpRead = async ({ id }) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const html = await res.text();

    const article = await extractFromHtml(html, url)
    return article;
  } catch (err) {
    console.log("error: " + err.message);
  }
};