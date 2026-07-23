import { supabase } from "../lib/supabase";

export async function getSavedArticles(userId) {
  return await supabase
    .from("saved_articles")
    .select("*")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });
}

export async function saveArticle(article) {
  return await supabase
    .from("saved_articles")
    .insert(article)
    .select()
    .single();
}

export async function removeSavedArticle(link, userId) {
  return await supabase
    .from("saved_articles")
    .delete()
    .eq("user_id", userId)
    .eq("link", link);
}

export async function isArticleSaved(link, userId) {
  return await supabase
    .from("saved_articles")
    .select("id")
    .eq("user_id", userId)
    .eq("link", link)
    .maybeSingle();
}

export async function toggleSavedArticle(article, userId) {
  const { data: existing, error } = await isArticleSaved(article.link, userId);

  if (error) {
    return { error };
  }

  if (existing) {
    return await removeSavedArticle(article.link, userId);
  }

  return await saveArticle({
    user_id: userId,
    title: article.title,
    description: article.description,
    link: article.link,
    image: article.image,
    author: article.author,
    published: article.published,
    feed_title: article.feedTitle,
    favicon: article.favicon,
  });
}
