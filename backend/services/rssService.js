export async function getFeedArticles(url) {
  const { data } = await axios.get(url, {
    timeout: 10000,
    maxRedirects: 5,
    responseType: "text",
  });

  const feed = await parser.parseString(data);

  const domain = new URL(url).hostname;

  return feed.items.map((item) => ({
    id: item.guid || item.link,
    title: item.title ?? "Untitled",
    description: stripHtml(item.contentSnippet || item.summary || ""),
    content: item["content:encoded"] || item.content || item.summary || "",
    link: item.link,
    author: item.creator || item.author || "",
    published: item.isoDate || item.pubDate || new Date().toISOString(),
    image:
      item.enclosure?.url ||
      item["media:thumbnail"]?.url ||
      item["media:content"]?.url ||
      item.itunes?.image ||
      extractImage(item.content || ""),
    feedTitle: feed.title,
    favicon: `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
    read: false,
  }));
}
