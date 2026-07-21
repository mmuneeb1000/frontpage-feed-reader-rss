import { useEffect, useState } from "react";
import Header from "../components/Header";
import FeedForm from "../components/Menu/FeedForm";
import Sidebar from "../components/Sidebar";
import ImportOPML from "../components/Menu/ImportOPML";
import ArticleList from "../components/ArticleList";
import ImportJSON from "../components/Menu/ImportJSON";
import { useAuth } from "../context/AuthContext";
import { getArticles } from "../services/articleService";
import { getFeeds, createFeed, clearFeeds } from "../services/feedService";

export default function Dashboard() {
  const { user } = useAuth();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  async function handleSelectFeed(feed) {
    setSelectedFeed(feed);
    setLoadingArticles(true);

    const { data, error } = await getArticles(feed.link);

    if (!error) {
      setArticles(data);
      setSelectedArticle(data[0] || null);
    }

    setLoadingArticles(false);
  }

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
  async function handleClearFeeds() {
    const confirmed = window.confirm("Delete all of your subscribed feeds?");

    if (!confirmed) return;

    const { error } = await clearFeeds(user.id);

    if (!error) {
      setFeeds([]);
      setArticles([]);
      setSelectedFeed(null);
      setSelectedArticle(null);
    }
  }

  return (
    <>
      <Header
        onCreateFeed={() => setActiveModal("feed")}
        onImportOPML={() => setActiveModal("opml")}
        onImportJSON={() => setActiveModal("json")}
      />

      <main className="grid h-[calc(100vh-64px)] grid-cols-[18rem_1fr]">
        <Sidebar
          feeds={filteredFeeds}
          selectedFeed={selectedFeed}
          onSelectFeed={handleSelectFeed}
          handleClearFeeds={handleClearFeeds}
        />

        <ArticleList
          articles={articles}
          loading={loadingArticles}
          selectedArticle={selectedArticle}
          onSelectArticle={setSelectedArticle}
        />
      </main>

      {activeModal === "feed" && (
        <FeedForm
          onSubmit={handleCreate}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "opml" && (
        <ImportOPML
          onImport={handleImport}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "json" && (
        <ImportJSON
          onImport={handleJsonImport}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
