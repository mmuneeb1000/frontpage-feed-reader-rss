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
import Discover from "./Discover";
import Digest from "./Digest";
import useFeeds from "../hooks/useFeed";
import useArticles from "../hooks/useArticle";
import useCategories from "../hooks/useCategory";
import useSavedArticles from "../hooks/useSavedArticles";
import useArticleStatus from "../hooks/useArticleStatus";
import useSearch from "../hooks/useSearch";
import BottomNavigation from "../components/BottomNavigation";

export default function Dashboard({ demo = false }) {
  const { user } = useAuth();

  const [page, setPage] = useState("feeds");
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
  } = useArticles();

  const { savedArticles, loadingSaved, toggleSaved, isSaved } =
    useSavedArticles(user, setSelectedArticle);

  const {
    categories,

    reorderCategories,
    renameCategory,
    removeCategory,
  } = useCategories(user, feeds, loadingFeeds, setFeeds, demo);
  const { statuses, toggleRead, markAllRead } = useArticleStatus(user);
  const applyReadStatus = useCallback(
    (articles = []) =>
      articles.map((article) => ({
        ...article,
        read: statuses[article.id] === "read",
      })),
    [statuses],
  );

  const filteredFeeds = useMemo(() => {
    if (!selectedCategory) return feeds;

    return feeds.filter((feed) => feed.category === selectedCategory);
  }, [feeds, selectedCategory]);
  const counts = useMemo(() => {
    const result = {
      all: 0,
      saved: savedArticles.length,
      categories: {},
    };

    allArticles.forEach((article) => {
      if (statuses[article.id] === "read") return;

      result.all++;

      const category = article.category ?? "Uncategorized";

      result.categories[category] = (result.categories[category] ?? 0) + 1;
    });

    return result;
  }, [allArticles, savedArticles.length, statuses]);
  const handleSelectFeed = useCallback(
    async (feed) => {
      setView("feed");
      selectFeed(feed);
      await loadFeed(feed);
    },
    [selectFeed, loadFeed],
  );
  const handleSelectArticle = useCallback(
    (article) => {
      setSelectedArticle(article);
      toggleRead(article);
    },
    [toggleRead],
  );
  const digestArticles = useMemo(
    () =>
      [...allArticles].sort(
        (a, b) => new Date(b.published) - new Date(a.published),
      ),
    [allArticles],
  );
  useEffect(() => {
    if (feeds.length) {
      loadHome(feeds);
    }
  }, [feeds, loadHome]);
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
        page={page}
        onChangePage={setPage}
        onCreateFeed={() => setActiveModal("feed")}
        onImportOPML={() => setActiveModal("opml")}
        handleClearFeeds={handleClear}
        setSidebarOpen={setSidebarOpen}
        value={search}
        onChange={(value) => setSearch(value)}
      />

      <main
        className={
          page === "feeds"
            ? "grid h-[calc(100vh-66px)] grid-cols-[1fr] md:grid-cols-[18rem_1fr] md:grid-rows-[1fr_auto] overflow-hidden lg:grid-cols-[18rem_1fr_26rem]"
            : "h-[calc(100vh-64px)] overflow-y-auto"
        }
      >
        {page === "feeds" && (
          <>
            <Sidebar
              demo={demo}
              view={view}
              unreadCount={counts.all}
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
                demo={demo}
                title={currentToolbar.title}
                unreadCount={counts.all}
                articles={currentToolbar.articles}
                onMarkAllRead={markAllRead}
                showMarkAllRead={currentToolbar.showMarkAllRead}
              />

              {view === "all" && (
                <AllItems
                  demo={demo}
                  articles={applyReadStatus(searchedAllArticles)}
                  loading={loadingHome}
                  selectedArticle={selectedArticle}
                  isSaved={isSaved}
                  toggleSaved={toggleSaved}
                  onSelectArticle={handleSelectArticle}
                />
              )}

              {view === "feed" && (
                <ArticleList
                  demo={demo}
                  articles={applyReadStatus(searchedArticles)}
                  loading={loadingArticles}
                  isSaved={isSaved}
                  toggleSaved={toggleSaved}
                  onSelectArticle={handleSelectArticle}
                  selectedArticle={selectedArticle}
                  selectedFeed={selectedFeed}
                  articleError={articleError}
                />
              )}

              {view === "saved" && (
                <ArticleSaved
                  demo={demo}
                  articles={applyReadStatus(searchedSavedArticles)}
                  loading={loadingSaved}
                  selectedArticle={selectedArticle}
                  onSelectArticle={handleSelectArticle}
                  onToggleSaved={toggleSaved}
                  isSaved={isSaved}
                />
              )}
            </div>

            <ReaderView
              demo={demo}
              article={selectedArticle}
              onBack={() => setSelectedArticle(null)}
              onToggleSaved={toggleSaved}
              isSaved={isSaved}
            />
          </>
        )}

        {page === "discover" && (
          <Discover
            demo={demo}
            feeds={feeds}
            loadingFeeds={loadingFeeds}
            handleCreate={handleCreate}
          />
        )}

        {page === "digest" && (
          <Digest demo={demo} user={user} articles={digestArticles} />
        )}
      </main>
      <BottomNavigation page={page} onChangePage={setPage} />

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
