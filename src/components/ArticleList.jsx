import { FiBookmark, FiExternalLink } from "react-icons/fi";

export default function ArticleList({
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
  articleError,
}) {
  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Loading articles...</p>
      </section>
    );
  }

  if (articleError) {
    return <div className="p-4 text-sm text-red-500">{articleError}</div>;
  }

  if (!Array.isArray(articles)) {
    return <div className="p-6 text-red-500">Invalid articles data.</div>;
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
          className="flex gap-5 border-b border-gray-300 p-4 transition"
        >
          <div className="flex w-250 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="rounded p-2 hover:bg-gray-100"
                >
                  <FiBookmark />
                </button>

                {!article.read && (
                  <span>
                    <img src={article.favicon} alt="" className="h-4 w-4" />
                  </span>
                )}

                <span className="text-sm font-medium text-gray-500">
                  {article.feedTitle}
                </span>

                <span className=" flex items-center gap-3 text-xs text-gray-500">
                  {new Date(article.published).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
            <div className="px-10">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded hover:underline"
              >
                <h3 className="text-lg font-semibold">{article.title}</h3>
              </a>

              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {article.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
