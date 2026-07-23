import { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../components/Layout/Header";
import FeedForm from "../components/Menu/FeedForm";
import AllItems from "../components/AllItems";
import ArticleList from "../components/ArticleList";
import ArticleSaved from "../components/ArticleSaved";
import Sidebar from "../components/Layout/Sidebar";
import ImportOPML from "../components/Menu/ImportOPML";
import ImportJSON from "../components/Menu/ImportJSON";
import { useAuth } from "../context/AuthContext";
import { getArticles } from "../services/articleService";
import useFeeds from "../hooks/useFeed";
import useArticles from "../hooks/useArticle";
import useCategories from "../hooks/useCategory";
import useSavedArticles from "../hooks/useSavedArticles";

export default function Dashboard({ demo = false }) {
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
  } = useFeeds(user, demo);
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

  const { savedArticles, loadingSaved, toggleSaved, isSaved } =
    useSavedArticles(demo ? null : user);
  const { categories, loadingCategories, setCategories, reorderCategories } =
    useCategories(user, feeds, loadingFeeds, demo);

  const filteredFeeds = useMemo(() => {
    return selectedCategory
      ? feeds.filter((feed) => feed.category === selectedCategory)
      : feeds;
  }, [feeds, selectedCategory]);
  const handleSelectFeed = useCallback(
    async (feed) => {
      setView("feed");
      selectFeed(feed);
      await loadFeed(feed);
    },
    [selectFeed, loadFeed],
  );
  useEffect(() => {
    if (feeds.length) {
      loadHome(feeds);
    }
  }, [feeds]);
  return (
    <>
      <Header
        demo={demo}
        onCreateFeed={() => setActiveModal("feed")}
        onImportOPML={() => setActiveModal("opml")}
        onImportJSON={() => setActiveModal("json")}
      />

      <main className="grid h-[calc(100vh-64px)] grid-cols-[18rem_1fr]">
        <Sidebar
          feeds={filteredFeeds}
          categories={categories}
          selectedFeed={selectedFeed}
          onSelectFeed={handleSelectFeed}
          handleClearFeeds={handleClear}
          onReorderCategories={reorderCategories}
          handleDeleteFeed={handleDelete}
          handleEditFeed={handleEdit}
          onShowAll={() => {
            setView("all");
            selectFeed(null);
          }}
          onShowSaved={() => {
            setView("saved");
            selectFeed(null);
          }}
        />

        {view === "all" && (
          <AllItems
            articles={allArticles}
            loading={loadingHome}
            selectedArticle={selectedArticle}
            isSaved={isSaved}
            toggleSaved={toggleSaved}
            onSelectArticle={setSelectedArticle}
          />
        )}

        {view === "feed" && (
          <ArticleList
            articles={articles}
            loading={loadingArticles}
            isSaved={isSaved}
            toggleSaved={toggleSaved}
            onSelectArticle={setSelectedArticle}
            selectedArticle={selectedArticle}
            selectedFeed={selectedFeed}
            articleError={articleError}
          />
        )}

        {view === "saved" && (
          <ArticleSaved
            articles={savedArticles}
            loading={loadingSaved}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
            onToggleSaved={toggleSaved}
            isSaved={isSaved}
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
