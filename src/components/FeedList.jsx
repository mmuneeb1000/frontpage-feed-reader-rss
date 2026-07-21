import { FiExternalLink, FiRss } from "react-icons/fi";

export default function FeedList({
  feeds,
  loading,
  selectedFeed,
  onSelectFeed,
}) {
  if (loading) {
    return (
      <section className="flex items-center justify-center">
        <p className="text-gray-500">Loading feeds...</p>
      </section>
    );
  }

  if (feeds.length === 0) {
    return (
      <section className="flex items-center justify-center">
        <p className="text-gray-500">No feeds found.</p>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto">
      <header className="sticky top-0 border-b bg-white px-6 py-4">
        <h2 className="text-2xl font-semibold">Your Feeds</h2>
        <p className="text-sm text-gray-500">{feeds.length} subscribed feeds</p>
      </header>

      <div>
        {feeds.map((feed) => (
          <button
            key={feed.id}
            onClick={() => onSelectFeed(feed)}
            className={`flex w-full items-start gap-4 border-b px-6 py-5 text-left transition ${
              selectedFeed?.id === feed.id ? "bg-green-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="mt-1 rounded-lg bg-green-100 p-2 text-green-700">
              <FiRss />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-medium">{feed.title}</h3>

              {feed.category && (
                <p className="mt-1 text-sm text-gray-500">{feed.category}</p>
              )}

              {feed.description && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {feed.description}
                </p>
              )}
            </div>

            <a
              href={feed.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
            >
              <FiExternalLink />
            </a>
          </button>
        ))}
      </div>
    </section>
  );
}
