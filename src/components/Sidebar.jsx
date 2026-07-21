import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHome,
  FiBookmark,
  FiRss,
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";

export default function Sidebar({
  feeds,
  selectedFeed,
  onSelectFeed,
  handleClearFeeds,
  onShowAll,
}) {
  const [openCategories, setOpenCategories] = useState(new Set());
  const categories = [
    ...new Set(feeds.map((feed) => feed.category).filter(Boolean)),
  ];
  function toggleCategory(category) {
    setOpenCategories((prev) => {
      const updated = new Set(prev);

      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }

      return updated;
    });
  }

  return (
    <aside className="flex justify-between h-full w-72 flex-col border-r border-gray-300 bg-gray-50">
      <div>
        <nav className="mt-6 px-4">
          <button
            onClick={onShowAll}
            className="flex w-full items-center justify-between rounded-lg bg-blue-50 
        px-3 py-2 text-left font-semibold text-blue-700 chover:bg-blue-200"
          >
            <span className="flex text-sm items-center gap-3">
              <FiHome />
              All Items
            </span>

            <span className="text-sm">{feeds.length}</span>
          </button>

          <button
            className="mt-2 flex text-sm w-full items-center gap-3 
        rounded-lg px-3 py-2 text-left hover:bg-gray-100"
          >
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
            {categories.map((category) => {
              const isOpen = openCategories.has(category);

              const categoryFeeds = feeds.filter(
                (feed) => feed.category === category,
              );

              return (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs 
                  font-semibold uppercase text-neutral-900 hover:bg-gray-100"
                  >
                    <span>{category}</span>

                    {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>

                  {isOpen && (
                    <div className="mt-1 space-y-1">
                      {categoryFeeds.map((feed) => (
                        <button
                          key={feed.id}
                          onClick={() => onSelectFeed(feed)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 
                          py-2 text-left text-sm transition ${
                            selectedFeed?.id === feed.id
                              ? "bg-blue-50 text-blue-700"
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2 
          text-sm bg-gray-50 text-green-700 "
      >
        <FiCheckCircle /> All feeds are healthy
      </div>
    </aside>
  );
}
