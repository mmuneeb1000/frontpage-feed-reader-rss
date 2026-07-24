import ArticleCard from "./Layout/ArticleCard";

export default function ArticleSaved({
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
  onToggleSaved,
  isSaved,
}) {
  if (loading) {
    return (
      <main className="flex items-center justify-center">
        Loading saved articles...
      </main>
    );
  }

  return (
    <section>
      {articles.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-gray-500">
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
