import { supabase } from "../lib/supabase";

export async function getFeeds(userId) {
  return await supabase
    .from("feeds")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function createFeed(feed) {
  return await supabase.from("feeds").insert(feed).select().single();
}

export async function updateFeed(id, values) {
  return await supabase
    .from("feeds")
    .update(values)
    .eq("id", id)
    .select()
    .single();
}

export async function clearFeeds(userId) {
  return await supabase.from("feeds").delete().eq("user_id", userId);
}
export async function deleteFeed(id) {
  return await supabase.from("feeds").delete().eq("id", id);
}
export async function updateFeedsCategory(userId, oldCategory, newCategory) {
  return supabase
    .from("feeds")
    .update({
      category: newCategory,
    })
    .eq("user_id", userId)
    .eq("category", oldCategory);
}
