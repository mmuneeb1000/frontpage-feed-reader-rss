import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/categoryService";

export default function useCategories(user, feeds, loadingFeeds, demo) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  async function syncCategories() {
    if (demo) {
      const demoCategories = [
        ...new Set(feeds.map((feed) => feed.category)),
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
    setLoadingCategories(true);

    const feedCategories = [
      ...new Set(feeds.map((feed) => feed.category || "Feed").filter(Boolean)),
    ];

    const { data, error } = await getCategories(user.id);

    if (error) {
      console.error(error);
      setLoadingCategories(false);
      return;
    }

    let current = data ?? [];

    const existing = new Set(current.map((c) => c.category));

    for (const category of feedCategories) {
      if (!existing.has(category)) {
        const { data: created } = await createCategory({
          user_id: user.id,
          category,
          position: current.length,
        });

        current.push(created);
      }
    }

    for (const category of current) {
      if (!feedCategories.includes(category.category)) {
        await deleteCategory(category.id);
      }
    }

    const { data: updated } = await getCategories(user.id);

    updated.sort((a, b) => a.position - b.position);

    setCategories(updated);
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
  useEffect(() => {
    if (loadingFeeds) return;

    if (demo || user) {
      syncCategories();
    }
  }, [demo, user, feeds, loadingFeeds]);

  return {
    categories,
    loadingCategories,
    reorderCategories,
    setCategories,
    syncCategories,
  };
}
