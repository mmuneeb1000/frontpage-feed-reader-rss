import { useEffect, useState } from "react";
import {
  getFeeds,
  createFeed,
  updateFeed,
  deleteFeed,
  clearFeeds,
} from "../services/feedService";

export default function useFeeds(user) {
  const [feeds, setFeeds] = useState([]);
  const [loadingFeeds, setLoadingFeeds] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const [selectedFeed, setSelectedFeed] = useState(null);
  const [editingFeed, setEditingFeed] = useState(null);

  async function loadFeeds() {
    if (!user) return;

    setLoadingFeeds(true);

    const { data, error } = await getFeeds(user.id);

    if (!error) {
      setFeeds(data);
    }

    setLoadingFeeds(false);
  }

  async function handleCreate(feed) {
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
