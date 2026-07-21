import { FiBookmark, FiExternalLink } from "react-icons/fi";

export default function ArticleList({
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
}) {
  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Loading articles...</p>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Select a feed to view its articles.</p>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto border-r">
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-4">
        <h2 className="text-xl font-semibold">Articles</h2>
        <p className="text-sm text-gray-500">{articles.length} articles</p>
      </header>

      {articles.map((article) => (
        <div
          key={article.id || article.link}
          onClick={() => onSelectArticle(article)}
          className={`w-full border-b px-6 py-5 text-left transition ${
            selectedArticle?.link === article.link
              ? "bg-green-50"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">{article.feedTitle}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // save article
              }}
              className="rounded p-1 hover:bg-gray-100"
            >
              <FiBookmark />
            </button>
          </div>

          <h3 className="line-clamp-2 text-lg font-medium">{article.title}</h3>

          {article.description && (
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {article.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">{article.pubDate}</span>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
            >
              <FiExternalLink />
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
