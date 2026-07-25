import { useCallback, useEffect, useState } from "react";
import {
  getArticleStatuses,
  markArticleRead,
  markArticleUnread,
  markAllArticlesRead,
} from "../services/statusService";

export default function useArticleStatus(user) {
  const [statuses, setStatuses] = useState({});
  const [loadingStatuses, setLoadingStatuses] = useState(true);

  const loadStatuses = useCallback(async () => {
    if (!user) {
      setStatuses({});
      setLoadingStatuses(false);
      return;
    }

    setLoadingStatuses(true);

    const { data, error } = await getArticleStatuses(user.id);

    if (error) {
      console.error(error);
      setLoadingStatuses(false);
      return;
    }

    const map = {};

    (data ?? []).forEach((item) => {
      map[item.article_id] = item.status;
    });

    setStatuses(map);
    setLoadingStatuses(false);
  }, [user]);

  const toggleRead = useCallback(
    async (article) => {
      if (!user) return;

      const isRead = statuses[article.id] === "read";

      const { error } = isRead
        ? await markArticleUnread(article.id, user.id)
        : await markArticleRead(article.id, user.id);

      if (error) {
        console.error(error);
        return;
      }

      setStatuses((prev) => ({
        ...prev,
        [article.id]: isRead ? "unread" : "read",
      }));
    },
    [statuses, user],
  );

  const markAllRead = useCallback(
    async (articles) => {
      if (!user || !articles?.length) return;

      const { error } = await markAllArticlesRead(articles, user.id);

      if (error) {
        console.error(error);
        return;
      }

      setStatuses((prev) => {
        const updated = { ...prev };

        articles.forEach((article) => {
          updated[article.id] = "read";
        });

        return updated;
      });
    },
    [user],
  );

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!user) {
        if (mounted) {
          setStatuses({});
          setLoadingStatuses(false);
        }
        return;
      }

      setLoadingStatuses(true);

      const { data, error } = await getArticleStatuses(user.id);

      if (!mounted) return;

      if (error) {
        console.error(error);
        setLoadingStatuses(false);
        return;
      }

      const map = {};

      (data ?? []).forEach((item) => {
        map[item.article_id] = item.status;
      });

      setStatuses(map);
      setLoadingStatuses(false);
    }

    init();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  return {
    statuses,
    loadingStatuses,
    loadStatuses,
    toggleRead,
    markAllRead,
  };
}
