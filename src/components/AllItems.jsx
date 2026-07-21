import { FiBookmark, FiExternalLink } from "react-icons/fi";

export default function AllItems({ articles, loading, onSelectArticle }) {
  if (loading) {
    return (
      <section className="overflow-y-auto">
        <p className="p-8 text-gray-500">Loading your feed...</p>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto">
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold">All Items</h1>
        <p className="mt-1 text-sm text-gray-500">
          Latest articles from your subscriptions
        </p>
      </header>

      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onSelectArticle(article)}
          className="flex cursor-pointer gap-5 border-b p-5 transition hover:bg-gray-50"
        >
          <div className="h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={article.favicon} alt="" className="h-4 w-4" />

                <span className="text-sm text-gray-500">
                  {article.feedTitle}
                </span>

                <span className="text-gray-300">•</span>

                <span className="text-xs text-gray-500">
                  {new Date(article.published).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="rounded p-2 hover:bg-gray-100">
                  <FiBookmark />
                </button>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded p-2 hover:bg-gray-100"
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>

            <h2 className="line-clamp-2 text-lg font-semibold">
              {article.title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {article.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
