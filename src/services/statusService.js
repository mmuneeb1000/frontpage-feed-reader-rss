import { supabase } from "../lib/supabase";

export async function markArticleRead(articleId, userId) {
  return await supabase.from("article_status").upsert(
    {
      user_id: userId,
      article_id: articleId,
      status: "read",
      updated_at: new Date(),
    },
    {
      onConflict: "user_id,article_id",
    },
  );
}

export async function getArticleStatuses(userId) {
  return await supabase
    .from("article_status")
    .select("*")
    .eq("user_id", userId);
}

export async function markArticleUnread(articleId, userId) {
  return await supabase.from("article_status").upsert(
    {
      user_id: userId,
      article_id: articleId,
      status: "unread",
      updated_at: new Date(),
    },
    {
      onConflict: "user_id,article_id",
    },
  );
}
export async function markAllArticlesRead(articles, userId) {
  const uniqueArticles = [
    ...new Map(articles.map((article) => [article.id, article])).values(),
  ];

  const rows = uniqueArticles.map((article) => ({
    user_id: userId,
    article_id: article.id,
    status: "read",
    updated_at: new Date(),
  }));

  return await supabase.from("article_status").upsert(rows, {
    onConflict: "user_id,article_id",
  });
}
