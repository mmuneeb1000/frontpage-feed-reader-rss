import ArticleCard from "./Layout/ArticleCard";
import LoadingState from "./Layout/LoadingState";
import TryDemo from "./TryDemo";

export default function ArticleSaved({
  demo,
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
  onToggleSaved,
  isSaved,
}) {
  if (loading) {
    return (
      <section className="overflow-y-auto">
        <LoadingState />
      </section>
    );
  }

  return (
    <section>
      {articles.length === 0 ? (
        <div className="h-[70vh] flex flex-1 items-center justify-center text-gray-500">
          No saved articles yet.
        </div>
      ) : (
        <div className="overflow-y-auto">
          {articles.map((article) => (
            <ArticleCard
              key={article.link}
              article={article}
              saved={isSaved(article)}
              onToggleSaved={onToggleSaved}
              onSelect={onSelectArticle}
              selected={selectedArticle?.link === article.link}
            />
          ))}
        </div>
      )}
    </section>
  );
}
