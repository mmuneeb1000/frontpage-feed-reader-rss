import { FiBookmark, FiExternalLink } from "react-icons/fi";
import Toolbar from "./Layout/Toolbar";
import ArticleCard from "./Layout/ArticleCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function AllItems({
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
  isSaved,
  toggleSaved,
}) {
  const { visibleItems, loaderRef, hasMore } = useInfiniteScroll(articles);
  if (loading) {
    return (
      <section className="overflow-y-auto">
        <p className="p-8 text-gray-500">Loading your feed...</p>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto">
      <Toolbar title="All Items" count={articles.length} />

      {visibleItems.map((article) => (
        <ArticleCard
          key={article.id || article.link}
          article={article}
          selected={selectedArticle?.link === article.link}
          onSelect={onSelectArticle}
          saved={isSaved(article)}
          onToggleSaved={toggleSaved}
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
