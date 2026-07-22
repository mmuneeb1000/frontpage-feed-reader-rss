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
import useFeeds from "../hooks/useFeed";
import useArticles from "../hooks/useArticle";

export default function Dashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [view, setView] = useState("all");

  const {
    feeds,
    loadingFeeds,
    selectedFeed,
    editingFeed,
    activeModal,

    setEditingFeed,
    setActiveModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleClear,

    handleImport,
    handleJsonImport,

    handleEdit,
    selectFeed,
  } = useFeeds(user);
  const {
    articles,
    allArticles,
    selectedArticle,

    loadingArticles,
    loadingHome,

    articleError,

    setSelectedArticle,

    loadFeed,
    loadHome,
    clearArticles,
  } = useArticles();
  const filteredFeeds = selectedCategory
    ? feeds.filter((feed) => feed.category === selectedCategory)
    : feeds;
  async function handleSelectFeed(feed) {
    setView("feed");
    selectFeed(feed);

    await loadFeed(feed);
  }

  useEffect(() => {
    if (feeds.length) {
      loadHome(feeds);
    }
  }, [feeds]);
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
          handleClearFeeds={handleClear}
          handleDeleteFeed={handleDelete}
          handleEditFeed={handleEdit}
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
