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
      <nav className="mt-6 px-4">
        <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-3 py-2 text-left text-green-700">
          <span className="flex items-center gap-3">
            <FiHome />
            All Items
          </span>

          <span className="text-sm">{feeds.length}</span>
        </button>

        <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100">
          <FiBookmark />
          Saved
        </button>
      </nav>

      <div className="mt-6 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </h2>

          <button
            onClick={handleClearFeeds}
            className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Clear
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase text-gray-400">
                {category}
              </h3>

              <div className="space-y-1">
                {feeds
                  .filter((feed) => feed.category === category)
                  .map((feed) => (
                    <button
                      key={feed.id}
                      onClick={() => onSelectFeed(feed)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                        selectedFeed?.id === feed.id
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?sz=32&domain_url=${feed.link}`}
                        alt=""
                        className="h-4 w-4 shrink-0"
                      />

                      <span className="truncate">{feed.title}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
