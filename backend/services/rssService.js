import Parser from "rss-parser";
import axios from "axios";

const parser = new Parser();

function extractImage(html = "") {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export async function getFeedArticles(url) {
  const { data } = await axios.get(url);

  const feed = await parser.parseString(data);

  return feed.items.map((item) => {
    const html = item["content:encoded"] || item.content || item.summary || "";

    return {
      id: item.guid || item.link,

      title: item.title ?? "Untitled",

      description: item.contentSnippet || item.summary || "",

      content: html,

      link: item.link,

      author: item.creator || item.author || "",

      published: item.isoDate || item.pubDate || new Date().toISOString(),

      image:
        item.enclosure?.url ||
        item["media:thumbnail"]?.url ||
        item["media:content"]?.url ||
        item.itunes?.image ||
        extractImage(html),

      feedTitle: feed.title,
      favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${item.link}`,

      read: false,
    };
  });
}
