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
      <header className="sticky flex gap-5 items-center top-0 z-10 border-b border-gray-300 bg-white px-6 py-4">
        <h2 className="text-xl font-semibold">Articles</h2>
        <p className="text-sm text-gray-500">{articles.length} articles</p>
      </header>

      {articles.map((article) => (
        <div
          key={article.id || article.link}
          onClick={() => onSelectArticle(article)}
          className="flex gap-5 border-b border-gray-300 p-5 transition bg-gray-50"
        >
          <div className="h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!article.read && (
                  <span>
                    <img src={article.favicon} alt="" className="h-4 w-4" />
                  </span>
                )}

                <span className="text-sm font-medium text-gray-500">
                  {article.feedTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="rounded p-2 hover:bg-gray-100"
                >
                  <FiBookmark />
                </button>
              </div>
            </div>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded p-2 hover:bg-gray-100"
            >
              <h3 className="line-clamp-2 text-lg font-semibold">
                {article.title}
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {article.description}
            </p>

            <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-gray-500">
              <span>
                {new Date(article.published).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
