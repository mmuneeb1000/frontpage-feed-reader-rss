import { useState } from "react";
import { FiCheck, FiExternalLink, FiPlus } from "react-icons/fi";

import discoverFeeds from "../data/discover-feeds.json";

export default function Discover({
  demo = false,
  feeds,
  loadingFeeds,
  handleCreate,
}) {
  const [selectedCategory, setSelectedCategory] = useState(discoverFeeds[0]);

  function isAdded(feed) {
    return feeds.some((item) => item.link === feed.feedUrl);
  }

  async function handleAdd(feed) {
    if (demo || isAdded(feed)) return;

    await handleCreate({
      title: feed.title,
      description: feed.description,
      link: feed.feedUrl,
      siteUrl: feed.siteUrl,
      category: selectedCategory.name,
    });
  }

  async function handleAddAll() {
    if (demo) return;

    const remaining = selectedCategory.feeds.filter((feed) => !isAdded(feed));

    for (const feed of remaining) {
      await handleAdd(feed);
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <header>
        <h1 className="text-4xl font-bold">Discover</h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Browse curated RSS feeds and quickly build your reading experience.
          Choose individual feeds or add an entire category in one click.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {discoverFeeds.map((category) => {
          const added = category.feeds.filter(isAdded).length;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl border p-5 text-left transition ${
                selectedCategory.id === category.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold">{category.name}</h2>

                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {added}/{category.feeds.length}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {category.description}
              </p>

              <p className="mt-4 text-sm font-medium text-blue-600">
                {category.feeds.length} feeds
              </p>
            </button>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{selectedCategory.name}</h2>

            <p className="mt-2 text-gray-600">{selectedCategory.description}</p>
          </div>

          <button
            disabled={
              demo || loadingFeeds || selectedCategory.feeds.every(isAdded)
            }
            onClick={handleAddAll}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add All
          </button>
        </div>

        <div className="divide-y">
          {selectedCategory.feeds.map((feed) => (
            <article
              key={feed.feedUrl}
              className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{feed.title}</h3>

                  <a
                    href={feed.siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 transition hover:text-gray-700"
                  >
                    <FiExternalLink />
                  </a>
                </div>

                <p className="mt-2 text-sm text-gray-600">{feed.description}</p>

                <p className="mt-3 truncate text-xs text-gray-400">
                  {feed.siteUrl}
                </p>
              </div>

              {isAdded(feed) ? (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <FiCheck />
                  Added
                </div>
              ) : (
                <button
                  disabled={demo || loadingFeeds}
                  onClick={() => handleAdd(feed)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiPlus />
                  Add Feed
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
