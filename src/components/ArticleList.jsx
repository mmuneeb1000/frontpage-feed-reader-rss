import { FiBookmark, FiExternalLink } from "react-icons/fi";
import Toolbar from "./Layout/Toolbar";
import ArticleCard from "./Layout/ArticleCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function ArticleList({
  articles,
  loading,
  onSelectArticle,
  selectedArticle,
  articleError,
  selectedFeed,
}) {
  const { visibleItems, loaderRef, hasMore } = useInfiniteScroll(articles);
  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Loading articles...</p>
      </section>
    );
  }

  if (!Array.isArray(articles)) {
    return <div className="p-6 text-red-500">Invalid articles data.</div>;
  }
  if (articles.length === 0 || articleError) {
    return <div className="p-4 text-sm text-red-500">{articleError}</div>;
  }

  return (
    <section className="overflow-y-auto border-r">
      <Toolbar
        title={selectedFeed?.title || "Articles"}
        count={articles.length}
      />
      {visibleItems.map((article) => (
        <ArticleCard
          key={article.id || article.link}
          article={article}
          selected={selectedArticle?.link === article.link}
          onSelect={onSelectArticle}
        />
      ))}
      {hasMore && (
        <div ref={loaderRef} className="py-6 text-center text-sm text-gray-500">
          Loading more...
        </div>
      )}
    </section>
  );
}
