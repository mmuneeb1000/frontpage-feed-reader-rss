import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import FeedForm from "../components/Menu/FeedForm";
import AllItems from "../components/AllItems";
import Sidebar from "../components/Layout/Sidebar";
import ImportOPML from "../components/Menu/ImportOPML";
import ArticleList from "../components/ArticleList";
import ImportJSON from "../components/Menu/ImportJSON";
import { useAuth } from "../context/AuthContext";
import { getArticles } from "../services/articleService";
import {
  getFeeds,
  createFeed,
  clearFeeds,
  deleteFeed,
} from "../services/feedService";

export default function Dashboard() {
  const { user } = useAuth();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [view, setView] = useState("all");
  const [editingFeed, setEditingFeed] = useState(null);
  const [showFeedModal, setShowFeedModal] = useState(false);

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loadingHome, setLoadingHome] = useState(true);
  const [articleError, setArticleError] = useState("");
  async function handleSelectFeed(feed) {
    setView("feed");
    setSelectedFeed(feed);
    setEditingFeed(feed);
    setShowFeedModal(true);
    setLoadingArticles(true);
    setArticleError("");

    try {
      const { data, error } = await getArticles(feed.link);

      setArticles(data);
      setSelectedArticle(data[0] || null);
    } catch (err) {
      setArticles([]);
      setSelectedArticle(null);
      setArticleError(err.message);
    } finally {
      setLoadingArticles(false);
    }
  }

  const filteredFeeds = selectedCategory
    ? feeds.filter((feed) => feed.category === selectedCategory)
    : feeds;
  async function loadHomeFeed(feedList) {
    setLoadingHome(true);

    const selectedFeeds = feedList.slice(0, 5);

    const results = await Promise.all(
      selectedFeeds.map((feed) => getArticles(feed.link)),
    );

    const articles = results
      .flatMap((result) => result.data || [])
      .sort((a, b) => new Date(b.published) - new Date(a.published));

    setAllArticles(articles);
    setLoadingHome(false);
  }
  async function loadFeeds() {
    if (!user) return;

    const { data, error } = await getFeeds(user.id);

    if (!error) {
      setFeeds(data);

      loadHomeFeed(data);
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
  async function handleUpdate(updatedFeed) {
    const { data, error } = await updateFeed(editingFeed.id, updatedFeed);

    if (error) {
      console.error(error);
      return;
    }

    setFeeds((prev) =>
      prev.map((feed) => (feed.id === editingFeed.id ? data : feed)),
    );

    setEditingFeed(null);
    setActiveModal(null);
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
  function handleEditFeed(feed) {
    setEditingFeed(feed);
    setActiveModal("feed");
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
  async function handleDeleteFeed(id) {
    const { error } = await deleteFeed(id);

    if (error) {
      console.error(error);
      return;
    }

    setFeeds((prev) => prev.filter((feed) => feed.id !== id));

    if (selectedFeed?.id === id) {
      setSelectedFeed(null);
      setArticles([]);
      setSelectedArticle(null);
      setView("all");
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
          handleDeleteFeed={handleDeleteFeed}
          handleEditFeed={handleEditFeed}
          onShowAll={() => setView("all")}
        />

        {view === "all" ? (
          <AllItems
            articles={allArticles}
            loading={loadingHome}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
          />
        ) : (
          <ArticleList
            articles={articles}
            loading={loadingArticles}
            onSelectArticle={setSelectedArticle}
            selectedArticle={selectedArticle}
            articleError={articleError}
          />
        )}
      </main>

      {activeModal === "feed" && (
        <FeedForm
          feed={editingFeed}
          onSubmit={editingFeed ? handleUpdate : handleCreate}
          onClose={() => {
            setEditingFeed(null);
            setActiveModal(null);
          }}
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
