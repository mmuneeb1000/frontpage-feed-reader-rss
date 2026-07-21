import Parser from "rss-parser";
import axios from "axios";

const parser = new Parser();

export async function getFeedArticles(url) {
  const { data } = await axios.get(url);

  const feed = await parser.parseString(data);

  return feed.items.map((item) => ({
    id: item.guid || item.link,
    title: item.title,
    description: item.contentSnippet || item.summary || "",
    content: item["content:encoded"] || item.content || "",
    link: item.link,
    author: item.creator || item.author || "",
    published: item.pubDate,
    image: item.enclosure?.url || item.itunes?.image || null,
    feedTitle: feed.title,
  }));
}
