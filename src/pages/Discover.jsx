import { useState } from "react";
import { FiCheck, FiChevronDown, FiExternalLink, FiPlus } from "react-icons/fi";

import discoverFeeds from "../data/discover-feeds.json";

export default function Discover({
  demo = false,
  feeds = [],
  loadingFeeds,
  handleCreate,
}) {
  const [openCategory, setOpenCategory] = useState(discoverFeeds.id);

  function isAdded(feed) {
    return feeds.some((item) => item.link === feed.feedUrl);
  }

  async function handleAdd(feed, category) {
    if (demo || isAdded(feed)) return;

    await handleCreate({
      title: feed.title,
      description: feed.description,
      link: feed.feedUrl,
      site_url: feed.siteUrl,
      category: category.name,
    });
  }

  async function handleAddAll(category) {
    if (demo) return;

    const remaining = category.feeds.filter((feed) => !isAdded(feed));

    for (const feed of remaining) {
      await handleAdd(feed, category);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl p-8">
      <header>
        <h1 className="text-3xl font-bold">Discover</h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Browse curated RSS feeds and quickly build your reading experience.
          Expand a category and add individual feeds or the entire collection.
        </p>
      </header>

      <section className="mt-8 space-y-4">
        {discoverFeeds.map((category) => {
          const isOpen = openCategory === category.id;
          const added = category.feeds.filter(isAdded).length;

          return (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-xl border border-blue-100/70 
              bg-gradient-to-br from-white via-blue-50/40 to-sky-100/30 
              shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div
                onClick={() => setOpenCategory(isOpen ? null : category.id)}
                className="flex flex-col gap-4 md:flex-row w-full items-center md:justify-between p-5 text-left transition "
              >
                <div>
                  <h2 className="font-semibold text-lg">{category.name}</h2>

                  <p className="mt-1 text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    disabled={
                      demo || loadingFeeds || category.feeds.every(isAdded)
                    }
                    onClick={() => handleAddAll(category)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add All
                  </button>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                    {added}/{category.feeds.length}
                  </span>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-gray-200 p-6">
                  <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-5">
                    {category.feeds.map((feed) => (
                      <article
                        key={feed.feedUrl}
                        className="flex flex-col justify-between rounded-xl border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-semibold">
                                {feed.title}
                              </h3>

                              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                {feed.description}
                              </p>
                            </div>

                            <a
                              href={feed.siteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 transition hover:text-gray-700"
                            >
                              <FiExternalLink size={16} />
                            </a>
                          </div>

                          <p className="mt-4 truncate text-xs text-gray-500">
                            {new URL(feed.siteUrl).hostname}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-end">
                          {isAdded(feed) ? (
                            <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              <FiCheck />
                              Added
                            </span>
                          ) : (
                            <button
                              disabled={demo || loadingFeeds}
                              onClick={() => handleAdd(feed, category)}
                              className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FiPlus />
                              Add Feed
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
