import axios from "axios";
import Parser from "rss-parser";
import { getFeedArticles } from "../services/rssService.js";

const parser = new Parser();

export async function fetchArticles(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        message: "Feed URL is required.",
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        message: "Please enter a valid URL.",
      });
    }

    // Check if URL is reachable
    let data;

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        maxRedirects: 5,
        responseType: "text",
      });

      data = response.data;
    } catch {
      return res.status(400).json({
        message: "Unable to access this feed URL.",
      });
    }

    // Validate RSS/Atom
    try {
      await parser.parseString(data);
    } catch {
      return res.status(400).json({
        message: "The URL is not a valid RSS or Atom feed.",
      });
    }

    const articles = await getFeedArticles(url);

    return res.json(articles);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to fetch feed.",
    });
  }
}
