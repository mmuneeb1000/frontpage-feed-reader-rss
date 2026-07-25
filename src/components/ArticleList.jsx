import { FiBookmark, FiExternalLink } from "react-icons/fi";
import LoadingState from "./Layout/LoadingState";
import ArticleCard from "./Layout/ArticleCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function ArticleList({
  demo,
  articles,
  loading,
  isSaved,
  toggleSaved,
  onSelectArticle,
  selectedArticle,
  articleError,
  selectedFeed,
}) {
  const { visibleItems, loaderRef, hasMore } = useInfiniteScroll(articles);
  if (loading) {
    return (
      <section className="overflow-y-auto">
        <LoadingState />
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
    <section className="overflow-y-auto border-r border-gray-300">
      {visibleItems.map((article) => (
        <ArticleCard
          demo={demo}
          key={article.id || article.link}
          saved={isSaved(article)}
          onToggleSaved={toggleSaved}
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
