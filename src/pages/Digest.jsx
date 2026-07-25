import { FiClock, FiExternalLink } from "react-icons/fi";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LoadingState from "../components/Layout/LoadingState";

export default function Digest({ articles = [] }) {
  const { visibleItems, loaderRef, hasMore } = useInfiniteScroll(articles);

  if (!articles.length) {
    return (
      <main className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900">
            Your Digest is Empty
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Follow a few RSS feeds to generate a personalized magazine of
            today's stories.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10">
            <p className="text-sm text-gray-500">
              Visit Discover to add curated feeds and start building your daily
              digest.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const [featured, ...rest] = visibleItems;

  return (
    <main className="overflow-y-auto">
      <section className="mx-auto max-w-7xl p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Today's Digest</h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            A magazine view of the latest stories from every feed you follow.
          </p>
        </header>

        {featured && (
          <article
            onClick={() => window.open(featured.link, "_blank")}
            className="group mb-10 cursor-pointer overflow-hidden rounded-3xl 
            border border-gray-300 bg-white transition hover:shadow-xl"
          >
            {featured.image && (
              <img
                src={featured.image}
                alt=""
                loading="lazy"
                className="h-72 w-full object-cover"
              />
            )}

            <div className="p-8">
              <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
                <span>{featured.feedTitle}</span>

                <span>•</span>

                <div className="flex items-center gap-1">
                  <FiClock size={14} />
                  {new Date(featured.published).toLocaleDateString()}
                </div>
              </div>

              <h2 className="text-3xl font-bold transition group-hover:text-blue-600">
                {featured.title}
              </h2>

              <p className="mt-4 line-clamp-4 text-gray-600">
                {featured.description}
              </p>
            </div>
          </article>
        )}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((article) => (
            <article
              key={article.id || article.link}
              onClick={() => window.open(article.link, "_blank")}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-300
              bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                  <span>{article.feedTitle}</span>

                  <FiExternalLink />
                </div>

                <h3 className="line-clamp-2 text-lg font-semibold transition group-hover:text-blue-600">
                  {article.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                  {article.description}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {new Date(article.published).toLocaleDateString()}
                  </span>

                  {article.author && <span>{article.author}</span>}
                </div>
              </div>
            </article>
          ))}
        </section>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-10">
            <LoadingState />
          </div>
        )}
      </section>
    </main>
  );
}
