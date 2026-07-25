import ArticleCard from "./Layout/ArticleCard";
import LoadingState from "./Layout/LoadingState";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function AllItems({
  demo,
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
  isSaved,
  toggleSaved,
}) {
  const { visibleItems, loaderRef, hasMore } = useInfiniteScroll(articles);

  if (loading) {
    return <LoadingState />;
  }

  if (!articles.length) {
    return (
      <section className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-gray-500">No articles found.</p>
      </section>
    );
  }

  return (
    <section className="divide-y divide-gray-200">
      {visibleItems.map((article) => (
        <ArticleCard
          key={article.id ?? article.link}
          demo={demo}
          article={article}
          selected={selectedArticle?.link === article.link}
          onSelect={onSelectArticle}
          saved={isSaved(article)}
          onToggleSaved={toggleSaved}
        />
      ))}

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <LoadingState />
        </div>
      )}
    </section>
  );
}
