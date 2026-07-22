import { supabase } from "../lib/supabase";

export async function getCategories(userId) {
  return await supabase
    .from("category_order")
    .select("*")
    .eq("user_id", userId)
    .order("position");
}

export async function createCategory(category) {
  return await supabase
    .from("category_order")
    .insert(category)
    .select()
    .single();
}

export async function updateCategory(id, values) {
  return await supabase.from("category_order").update(values).eq("id", id);
}

export async function deleteCategory(id) {
  return await supabase.from("category_order").delete().eq("id", id);
}
