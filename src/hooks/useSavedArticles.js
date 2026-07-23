import { useEffect, useState } from "react";
import { getSavedArticles, toggleSavedArticle } from "../services/savedService";

export default function useSavedArticles(user) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  async function loadSavedArticles() {
    if (!user) {
      setSavedArticles([]);
      setLoadingSaved(false);
      return;
    }

    setLoadingSaved(true);

    const { data, error } = await getSavedArticles(user.id);

    if (error) {
      console.error(error);
      setLoadingSaved(false);
      return;
    }

    setSavedArticles(data);
    setLoadingSaved(false);
  }

  async function toggleSaved(article) {
    if (!user) return;

    const exists = savedArticles.some((saved) => saved.link === article.link);

    const previous = savedArticles;

    if (exists) {
      setSavedArticles((prev) =>
        prev.filter((saved) => saved.link !== article.link),
      );
    } else {
      setSavedArticles((prev) => [
        {
          ...article,
          user_id: user.id,
          saved_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    const { error } = await toggleSavedArticle(article, user.id);

    if (error) {
      console.error(error);
      setSavedArticles(previous);
    }
  }

  function isSaved(article) {
    return savedArticles.some((saved) => saved.link === article.link);
  }

  useEffect(() => {
    loadSavedArticles();
  }, [user]);

  return {
    savedArticles,
    loadingSaved,
    loadSavedArticles,
    toggleSaved,
    isSaved,
  };
}
