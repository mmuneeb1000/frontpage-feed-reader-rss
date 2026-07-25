import { useState, useCallback, useRef } from "react";
import { getArticles } from "../services/articleService";

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingHome, setLoadingHome] = useState(false);

  const [articleError, setArticleError] = useState("");

  const feedRequest = useRef(0);
  const homeRequest = useRef(0);

  const loadFeed = useCallback(async (feed) => {
    if (!feed?.link) {
      setArticles([]);
      setSelectedArticle(null);
      return;
    }

    const requestId = ++feedRequest.current;

    setLoadingArticles(true);
    setArticleError("");

    try {
      const { data, error } = await getArticles(feed.link);

      if (requestId !== feedRequest.current) return;

      if (error) {
        setArticles([]);
        setSelectedArticle(null);
        setArticleError(error);
        return;
      }

      setArticles(data ?? []);
      setSelectedArticle(data?.[0] ?? null);
    } catch (error) {
      if (requestId !== feedRequest.current) return;

      console.error(error);
      setArticles([]);
      setSelectedArticle(null);
      setArticleError("Failed to load feed.");
    } finally {
      if (requestId === feedRequest.current) {
        setLoadingArticles(false);
      }
    }
  }, []);

  const loadHome = useCallback(async (feeds) => {
    if (!feeds?.length) {
      setAllArticles([]);
      setSelectedArticle(null);
      setLoadingHome(false);
      return;
    }

    const requestId = ++homeRequest.current;

    setLoadingHome(true);

    try {
      const results = await Promise.all(
        feeds.slice(0, 5).map((feed) => getArticles(feed.link)),
      );

      if (requestId !== homeRequest.current) return;

      const merged = results
        .flatMap((result) => result.data ?? [])
        .sort((a, b) => new Date(b.published) - new Date(a.published));

      setAllArticles(merged);
    } catch (error) {
      if (requestId !== homeRequest.current) return;

      console.error(error);
      setAllArticles([]);
    } finally {
      if (requestId === homeRequest.current) {
        setLoadingHome(false);
      }
    }
  }, []);

  const clearArticles = useCallback(() => {
    feedRequest.current++;
    homeRequest.current++;

    setArticles([]);
    setAllArticles([]);
    setSelectedArticle(null);
    setArticleError("");
    setLoadingArticles(false);
    setLoadingHome(false);
  }, []);

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
