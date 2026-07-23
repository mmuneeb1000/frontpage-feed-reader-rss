import { useEffect, useState } from "react";
import {
  getArticleStatuses,
  markArticleRead,
  markArticleUnread,
  markAllArticlesRead,
} from "../services/statusService";

export default function useArticleStatus(user) {
  const [statuses, setStatuses] = useState({});

  async function loadStatuses() {
    if (!user) return;

    const { data, error } = await getArticleStatuses(user.id);

    if (error) {
      console.error(error);
      return;
    }

    const map = {};

    data.forEach((item) => {
      map[item.article_id] = item.status;
    });

    setStatuses(map);
  }

  async function toggleRead(article) {
    if (!user) return;

    const isRead = statuses[article.id] === "read";

    if (isRead) {
      await markArticleUnread(article.id, user.id);

      setStatuses((prev) => ({
        ...prev,
        [article.id]: "unread",
      }));
    } else {
      await markArticleRead(article.id, user.id);

      setStatuses((prev) => ({
        ...prev,
        [article.id]: "read",
      }));
    }
  }
  async function markAllRead(articles) {
    if (!user || !articles.length) return;

    const { error } = await markAllArticlesRead(articles, user.id);

    if (error) {
      console.error(error);
      return;
    }

    const updated = {};

    articles.forEach((article) => {
      updated[article.id] = "read";
    });

    setStatuses((prev) => ({
      ...prev,
      ...updated,
    }));
  }
  useEffect(() => {
    loadStatuses();
  }, [user]);

  return {
    statuses,
    toggleRead,
    markAllRead,
  };
}
