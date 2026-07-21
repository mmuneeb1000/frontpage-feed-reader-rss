import { useEffect, useState } from "react";
import Header from "../components/Header";
import FeedForm from "../components/FeedForm";
import Sidebar from "../components/Sidebar";
import FeedList from "../components/FeedList";
import ImportOPML from "../components/ImportOPML";
import ImportJSON from "../components/ImportJSON";
import { useAuth } from "../context/AuthContext";
import { getFeeds, createFeed } from "../services/feedService";

export default function Dashboard() {
  const { user } = useAuth();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredFeeds = selectedCategory
    ? feeds.filter((feed) => feed.category === selectedCategory)
    : feeds;

  async function loadFeeds() {
    if (!user) return;

    const { data, error } = await getFeeds(user.id);

    if (!error) {
      setFeeds(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadFeeds();
  }, [user]);

  async function handleCreate(feed) {
    const { error } = await createFeed({
      ...feed,
      user_id: user.id,
    });

    if (!error) {
      loadFeeds();
    }
  }

  async function handleImport(importedFeeds) {
    for (const feed of importedFeeds) {
      await createFeed({
        ...feed,
        user_id: user.id,
      });
    }

    loadFeeds();
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

    loadFeeds();
  }

  return (
    <>
      <Header />

      <main className="grid h-[calc(100vh-64px)] grid-cols-[18rem_1fr]">
        <Sidebar
          feeds={feeds}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FeedList feeds={filteredFeeds} loading={loading} />
      </main>

      {/* Temporary import/create tools
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <FeedForm onSubmit={handleCreate} />
        <ImportOPML onImport={handleImport} />
        <ImportJSON onImport={handleJsonImport} />
      </div> */}
    </>
  );
}
