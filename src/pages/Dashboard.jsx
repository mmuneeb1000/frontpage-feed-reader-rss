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
import { useAuth } from "../context/AuthContext";
import { getArticles } from "../services/articleService";
import useFeeds from "../hooks/useFeed";
import useArticles from "../hooks/useArticle";
import useCategories from "../hooks/useCategory";
import useSavedArticles from "../hooks/useSavedArticles";
import useArticleStatus from "../hooks/useArticleStatus";
import useSearch from "../hooks/useSearch";

export default function Dashboard({ demo = false }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    handleEdit,
    selectFeed,
  } = useFeeds(user, demo, setSidebarOpen);
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
  const [search, setSearch] = useState("");
  const searchedAllArticles = useSearch(allArticles, search);

  const searchedArticles = useSearch(articles, search);

  const searchedSavedArticles = useSearch(savedArticles, search);
  const toolbar = {
    all: {
      title: "All Items",
      count: searchedAllArticles.length,
      articles: searchedAllArticles,
      showMarkAllRead: true,
    },
    feed: {
      title: selectedFeed?.title ?? "Feed",
      count: searchedArticles.length,
      articles: searchedArticles,
      showMarkAllRead: true,
    },
    saved: {
      title: "Saved",
      count: searchedSavedArticles.length,
      articles: searchedSavedArticles,
      showMarkAllRead: true,
    },
  };

  const currentToolbar = toolbar[view];
  return (
    <>
      <DashboardHeader
        demo={demo}
        onCreateFeed={() => setActiveModal("feed")}
        onImportOPML={() => setActiveModal("opml")}
        handleClearFeeds={handleClear}
        setSidebarOpen={setSidebarOpen}
        value={search}
        onChange={(value) => setSearch(value)}
      />

      <main className="grid grid-cols-[1fr] h-[calc(100vh-64px)] md:grid-cols-[18rem_1fr_26rem] overflow-hidden">
        <Sidebar
          view={view}
          unreadCount={unreadCount}
          savedCount={savedArticles.length}
          feeds={filteredFeeds}
          categories={categories}
          selectedFeed={selectedFeed}
          sidebarOpen={sidebarOpen}
          renameCategory={renameCategory}
          removeCategory={removeCategory}
          onSelectFeed={handleSelectFeed}
          onReorderCategories={reorderCategories}
          handleDeleteFeed={handleDelete}
          handleEditFeed={handleEdit}
          setSidebarOpen={setSidebarOpen}
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
              articles={applyReadStatus(searchedAllArticles)}
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
              articles={applyReadStatus(searchedArticles)}
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
              articles={applyReadStatus(searchedSavedArticles)}
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
    </>
  );
}
