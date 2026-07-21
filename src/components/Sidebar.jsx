import { Link, NavLink } from "react-router-dom";
import { FiHome, FiBookmark, FiRss, FiPlus } from "react-icons/fi";

export default function Sidebar({
  feeds,
  selectedFeed,
  onSelectFeed,
  handleClearFeeds,
}) {
  const categories = [
    ...new Set(feeds.map((feed) => feed.category).filter(Boolean)),
  ];

  return (
    <aside className="flex h-full w-72 flex-col border-r bg-white">
      <nav className="space-y-1 p-4">
        <NavLink
          to="/"
          className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <FiHome />
            All Items
          </span>

          <span className="text-sm text-gray-500">{feeds.length}</span>
        </NavLink>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100">
          <FiBookmark />
          Saved
        </button>
      </nav>

      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </h2>
          <div>
            <button
              onClick={handleClearFeeds}
              className="rounded-lg border border-red-200 p-1 text-xs
           text-red-600 transition hover:bg-red-50"
            >
              Clear Feeds
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {feeds.map((feed) => (
            <button
              key={feed.id}
              onClick={() => onSelectFeed(feed)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-100"
            >
              <span className="flex items-center gap-3">
                <FiRss className="text-sm" />
                {feed.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <p className="text-sm text-green-600">All feeds healthy</p>
      </div>
    </aside>
  );
}
