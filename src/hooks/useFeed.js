import { useEffect, useState } from "react";
import sampleFeeds from "../data/sample-feeds.json";
import {
  getFeeds,
  createFeed,
  updateFeed,
  deleteFeed,
  clearFeeds,
} from "../services/feedService";

export default function useFeeds(user, demo = false) {
  const [feeds, setFeeds] = useState([]);
  const [loadingFeeds, setLoadingFeeds] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const [selectedFeed, setSelectedFeed] = useState(null);
  const [editingFeed, setEditingFeed] = useState(null);
  function getDemoFeeds() {
    return sampleFeeds.categories.flatMap((category) =>
      category.feeds.map((feed, index) => ({
        id: `demo-${category.name}-${index}`,
        title: feed.title,
        description: feed.description ?? "",
        link: feed.feedUrl,
        siteUrl: feed.siteUrl,
        category: category.name,
        isDemo: true,
      })),
    );
  }
  async function loadFeeds() {
    if (demo) {
      setFeeds(getDemoFeeds());
      setLoadingFeeds(false);
      return;
    }
    if (!user) {
      setFeeds(getDemoFeeds());
      setLoadingFeeds(false);
      return;
    }

    setLoadingFeeds(true);

    const { data, error } = await getFeeds(user.id);

    if (!error) {
      setFeeds(data);
    }

    setLoadingFeeds(false);
  }

  async function handleCreate(feed) {
    if (demo) return;
    const { data, error } = await createFeed({
      ...feed,
      user_id: user.id,
    });

    if (error) {
      return { error };
    }

    setFeeds((prev) => [data, ...prev]);

    return { data, error: null };
  }

  async function handleUpdate(updatedFeed) {
    if (demo) return;
    const { data, error } = await updateFeed(editingFeed.id, updatedFeed);

    if (error) {
      return { error };
    }

    setFeeds((prev) =>
      prev.map((feed) => (feed.id === editingFeed.id ? data : feed)),
    );

    setEditingFeed(null);

    return { data, error: null };
  }

  async function handleDelete(id) {
    if (demo) return;
    const { error } = await deleteFeed(id);

    if (error) {
      return { error };
    }

    setFeeds((prev) => prev.filter((feed) => feed.id !== id));

    if (selectedFeed?.id === id) {
      setSelectedFeed(null);
    }

    return { error: null };
  }

  async function handleClear() {
    if (demo) return;
    const { error } = await clearFeeds(user.id);

    if (error) {
      return { error };
    }

    setFeeds([]);
    setSelectedFeed(null);

    return { error: null };
  }

  async function handleImport(importedFeeds) {
    for (const feed of importedFeeds) {
      await createFeed({
        ...feed,
        user_id: user.id,
      });
    }

    await loadFeeds();
  }

  async function handleJsonImport(data) {
    const feeds = data.categories.flatMap((category) =>
      category.feeds.map((feed) => ({
        user_id: user.id,
        title: feed.title,
        description: feed.description,
        link: feed.feedUrl,
        category: category.name,
      })),
    );

    for (const feed of feeds) {
      await createFeed(feed);
    }

    await loadFeeds();
  }

  function handleEdit(feed) {
    setEditingFeed(feed);
    setActiveModal("feed");
  }

  function selectFeed(feed) {
    setSelectedFeed(feed);
  }

  useEffect(() => {
    loadFeeds();
  }, [user]);

  return {
    feeds,
    loadingFeeds,

    selectedFeed,
    editingFeed,
    activeModal,
    setFeeds,
    setSelectedFeed,
    setEditingFeed,
    setActiveModal,
    loadFeeds,
    selectFeed,

    handleCreate,
    handleUpdate,
    handleDelete,
    handleClear,

    handleImport,
    handleJsonImport,
    handleEdit,
  };
}
