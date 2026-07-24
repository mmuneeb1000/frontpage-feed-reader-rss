import { useEffect, useState, useMemo, useCallback } from "react";
import DashboardHeader from "../components/Layout/DashboardHeader";
import FeedForm from "../components/Menu/FeedForm";
import ArticleToolbar from "../components/Layout/ArticleToolbar";
import AllItems from "../components/AllItems";
import ArticleList from "../components/ArticleList";
import ArticleSaved from "../components/ArticleSaved";
import Sidebar from "../components/Layout/Sidebar";
import ReaderView from "../components/Reader/ReaderView";
import ImportOPML from "../components/Menu/ImportOPML";
import ImportJSON from "../components/Menu/ImportJSON";
import { useAuth } from "../context/AuthContext";
import { getArticles } from "../services/articleService";
import useFeeds from "../hooks/useFeed";
import useArticles from "../hooks/useArticle";
import useCategories from "../hooks/useCategory";
import useSavedArticles from "../hooks/useSavedArticles";
import useArticleStatus from "../hooks/useArticleStatus";

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

    setFeeds,
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
    useSavedArticles(demo ? null : user, setSelectedArticle);
  const {
    categories,
    loadingCategories,
    setCategories,
    reorderCategories,
    renameCategory,
    removeCategory,
  } = useCategories(user, feeds, loadingFeeds, setFeeds, demo);
  const { statuses, toggleRead, markAllRead } = useArticleStatus(
    demo ? null : user,
  );
  const applyReadStatus = (articles = []) =>
    articles.map((article) => ({
      ...article,
      read: statuses[article.id] === "read",
    }));

  const filteredFeeds = useMemo(() => {
    return selectedCategory
      ? feeds.filter((feed) => feed.category === selectedCategory)
      : feeds;
  }, [feeds, selectedCategory]);
  const unreadCount = allArticles.filter(
    (article) => statuses[article.id] !== "read",
  ).length;
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
  const toolbar = {
    all: {
      title: "All Items",
      count: unreadCount,
      articles: allArticles,
      showMarkAllRead: true,
    },
    feed: {
      title: selectedFeed?.title ?? "Feed",
      count: articles.length,
      articles: articles,
      showMarkAllRead: true,
    },
    saved: {
      title: "Saved",
      count: savedArticles.length,
      articles: savedArticles,
      showMarkAllRead: false,
    },
  };

  const currentToolbar = toolbar[view];
  return (
    <>
      <DashboardHeader
        demo={demo}
        onCreateFeed={() => setActiveModal("feed")}
        onImportOPML={() => setActiveModal("opml")}
        onImportJSON={() => setActiveModal("json")}
        handleClearFeeds={handleClear}
      />

      <main className="grid h-[calc(100vh-64px)] grid-cols-[18rem_1fr_26rem] overflow-hidden">
        <Sidebar
          view={view}
          unreadCount={unreadCount}
          savedCount={savedArticles.length}
          feeds={filteredFeeds}
          categories={categories}
          selectedFeed={selectedFeed}
          renameCategory={renameCategory}
          removeCategory={removeCategory}
          onSelectFeed={handleSelectFeed}
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
        <div className="flex flex-1 flex-col overflow-y-auto">
          <ArticleToolbar
            title={currentToolbar.title}
            count={currentToolbar.count}
            articles={currentToolbar.articles}
            onMarkAllRead={markAllRead}
            showMarkAllRead={currentToolbar.showMarkAllRead}
          />
          {view === "all" && (
            <AllItems
              articles={applyReadStatus(allArticles)}
              loading={loadingHome}
              selectedArticle={selectedArticle}
              isSaved={isSaved}
              toggleSaved={toggleSaved}
              onSelectArticle={(article) => {
                setSelectedArticle(article);
                toggleRead(article);
              }}
            />
          )}

          {view === "feed" && (
            <ArticleList
              articles={applyReadStatus(articles)}
              onSelectArticle={setSelectedArticle}
              loading={loadingArticles}
              isSaved={isSaved}
              toggleSaved={toggleSaved}
              onSelectArticle={(article) => {
                setSelectedArticle(article);
                toggleRead(article);
              }}
              selectedArticle={selectedArticle}
              selectedFeed={selectedFeed}
              articleError={articleError}
            />
          )}

          {view === "saved" && (
            <ArticleSaved
              articles={applyReadStatus(savedArticles)}
              loading={loadingSaved}
              selectedArticle={selectedArticle}
              onSelectArticle={(article) => {
                setSelectedArticle(article);
                toggleRead(article);
              }}
              onToggleSaved={toggleSaved}
              isSaved={isSaved}
            />
          )}
        </div>
        <ReaderView
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onToggleSaved={toggleSaved}
          isSaved={isSaved}
        />
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
