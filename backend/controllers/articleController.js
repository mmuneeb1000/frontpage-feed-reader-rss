import { getFeedArticles } from "../services/rssService.js";

export async function fetchArticles(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        message: "Feed URL is required.",
      });
    }

    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        message: "Please enter a valid URL.",
      });
    }

    const articles = await getFeedArticles(url);

    if (!articles.length) {
      return res.status(404).json({
        message: "No articles found.",
      });
    }

    return res.json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to fetch feed.",
    });
  }
}
