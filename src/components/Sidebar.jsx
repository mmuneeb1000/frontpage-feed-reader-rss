import { Link, NavLink } from "react-router-dom";
import { FiHome, FiBookmark, FiRss, FiPlus } from "react-icons/fi";

export default function Sidebar({
  feeds,
  onAddFeed,
  selectedCategory,
  onSelectCategory,
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

      <div className="px-4 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </h2>

          <button onClick={onAddFeed} className="rounded p-1 hover:bg-gray-100">
            <FiPlus />
          </button>
        </div>

        <div className="space-y-1">
          {categories.map((category) => {
            const count = feeds.filter(
              (feed) => feed.category === category,
            ).length;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition ${
                  selectedCategory === category
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FiRss className="text-sm" />
                  {category}
                </span>

                <span className="text-sm text-gray-500">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <p className="text-sm text-green-600">All feeds healthy</p>
      </div>
    </aside>
  );
}
