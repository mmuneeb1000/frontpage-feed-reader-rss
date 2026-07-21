import { getFeedArticles } from "../services/rssService.js";

export async function fetchArticles(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        message: "Feed URL is required.",
      });
    }

    const articles = await getFeedArticles(url);

    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch feed.",
    });
  }
}
