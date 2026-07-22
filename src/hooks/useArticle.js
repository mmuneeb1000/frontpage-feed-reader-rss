import { useState } from "react";
import { getArticles } from "../services/articleService";

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState(null);

  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingHome, setLoadingHome] = useState(true);

  const [articleError, setArticleError] = useState("");

  async function loadFeed(feed) {
    setLoadingArticles(true);
    setArticleError("");

    const { data, error } = await getArticles(feed.link);

    if (error) {
      setArticles([]);
      setSelectedArticle(null);
      setArticleError(error);
    } else {
      setArticles(data);
      setSelectedArticle(data[0] || null);
    }

    setLoadingArticles(false);
  }

  async function loadHome(feeds) {
    setLoadingHome(true);

    try {
      const selectedFeeds = feeds.slice(0, 5);

      const results = await Promise.all(
        selectedFeeds.map((feed) => getArticles(feed.link)),
      );

      const articles = results
        .flatMap((result) => result.data || [])
        .sort((a, b) => new Date(b.published) - new Date(a.published));

      setAllArticles(articles);
    } finally {
      setLoadingHome(false);
    }
  }

  function clearArticles() {
    setArticles([]);
    setSelectedArticle(null);
    setArticleError("");
  }

  return {
    articles,
    allArticles,

    selectedArticle,

    loadingArticles,
    loadingHome,

    articleError,

    setSelectedArticle,

    loadFeed,
    loadHome,
    clearArticles,
  };
}
