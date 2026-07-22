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
      <header className="sticky top-0 z-10 border-b border-gray-300 bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold">All Items</h1>
      </header>

      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onSelectArticle(article)}
          className="flex  gap-4 border-b border-gray-300 p-4 transition hover:bg-gray-50"
        >
          <div className="w-250 ">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <button className="rounded p-2 hover:bg-gray-100">
                    <FiBookmark />
                  </button>
                </div>
                <img src={article.favicon} alt="" className="h-4 w-4" />

                <span className="text-sm text-gray-500">
                  {article.feedTitle}
                </span>

                <span className="text-gray-300">•</span>

                <span className="text-xs text-gray-500">
                  {new Date(article.published).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="px-10">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded hover:bg-gray-100"
              >
                <h2 className=" py-1 text-lg font-semibold">{article.title}</h2>
              </a>
              <p className="line-clamp-2 text-sm text-gray-600">
                {article.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
