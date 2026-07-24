import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/categoryService";
import { updateFeedsCategory } from "../services/feedService";

export default function useCategories(
  user,
  feeds,
  loadingFeeds,
  setFeeds,
  demo,
) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  async function syncCategories() {
    if (demo) {
      const demoCategories = [
        ...new Set(feeds.map((feed) => feed.category || "Uncategorized")),
      ].map((category, index) => ({
        id: `demo-${index}`,
        category,
        position: index,
      }));

      setCategories(demoCategories);
      setLoadingCategories(false);
      return;
    }

    if (!user) return;

    if (feeds.length === 0) {
      setCategories([]);
      setLoadingCategories(false);
      return;
    }

    setLoadingCategories(true);

    const feedCategories = [
      ...new Set(
        feeds
          .map((feed) => feed.category?.trim() || "Uncategorized")
          .filter(Boolean),
      ),
    ];

    const { data, error } = await getCategories(user.id);

    if (error) {
      console.error(error);
      setLoadingCategories(false);
      return;
    }

    let current = (data ?? []).filter(Boolean);

    // Remove duplicate categories from database result
    const uniqueCategories = new Map();

    current.forEach((item) => {
      if (!uniqueCategories.has(item.category)) {
        uniqueCategories.set(item.category, item);
      }
    });

    current = Array.from(uniqueCategories.values());

    const existing = new Set(current.map((item) => item.category));

    // Create missing categories
    for (const category of feedCategories) {
      if (!existing.has(category)) {
        const { data: created, error: createError } = await createCategory({
          user_id: user.id,
          category,
          position: current.length,
        });

        if (createError) {
          console.error(createError);
          continue;
        }

        if (created) {
          current.push(created);
          existing.add(category);
        }
      }
    }

    const { data: updated, error: refreshError } = await getCategories(user.id);

    if (refreshError) {
      console.error(refreshError);
      setLoadingCategories(false);
      return;
    }

    setCategories((updated ?? []).sort((a, b) => a.position - b.position));

    setLoadingCategories(false);
  }

  async function reorderCategories(activeId, overId) {
    if (demo) return;
    if (activeId === overId) return;

    const oldIndex = categories.findIndex((c) => c.id === activeId);
    const newIndex = categories.findIndex((c) => c.id === overId);

    const reordered = arrayMove(categories, oldIndex, newIndex);

    setCategories(reordered);

    await Promise.all(
      reordered.map((category, index) =>
        updateCategory(category.id, {
          position: index,
        }),
      ),
    );
  }
  async function renameCategory(id, newName) {
    const category = categories.find((c) => c.id === id);

    if (!category) return;

    const name = newName?.trim();

    if (!name || name === category.category) return;

    const oldName = category.category;

    // Update feeds first
    const { error: feedError } = await updateFeedsCategory(
      user.id,
      oldName,
      name,
    );

    if (feedError) {
      console.error(feedError);
      return;
    }

    // Update category order
    const { error: categoryError } = await updateCategory(id, {
      category: name,
    });

    if (categoryError) {
      console.error(categoryError);
      return;
    }

    setFeeds((prev) =>
      prev.map((feed) =>
        feed.category === oldName
          ? {
              ...feed,
              category: name,
            }
          : feed,
      ),
    );
  }
  async function removeCategory(id) {
    const category = categories.find((item) => item.id === id);

    if (!category) return;

    const categoryName = category.category;

    if (categoryName === "Uncategorized") {
      return;
    }

    const { error: feedError } = await updateFeedsCategory(
      user.id,
      categoryName,
      "Uncategorized",
    );

    if (feedError) {
      console.error(feedError);
      return;
    }

    const { error: categoryError } = await deleteCategory(id);

    if (categoryError) {
      console.error(categoryError);
      return;
    }
    setFeeds((prev) =>
      prev.map((feed) =>
        feed.category === categoryName
          ? {
              ...feed,
              category: "Uncategorized",
            }
          : feed,
      ),
    );

    setCategories((prev) => prev.filter((item) => item.id !== id));
  }
  useEffect(() => {
    if (loadingFeeds) return;

    if (demo || user) {
      syncCategories();
    }
  }, [demo, user, feeds, loadingFeeds]);

  return {
    categories,
    loadingCategories,
    renameCategory,
    removeCategory,
    reorderCategories,
    setCategories,
    syncCategories,
  };
}
