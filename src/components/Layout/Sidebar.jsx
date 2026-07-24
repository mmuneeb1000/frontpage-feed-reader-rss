import { useState, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import SidebarCategory from "../SidebarCategory";
import { getCategoryColor } from "../../lib/categoryColor";
import {
  FiHome,
  FiBookmark,
  FiRss,
  FiPlus,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiCheckCircle,
  FiMoreVertical,
} from "react-icons/fi";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Sidebar({
  view,
  feeds,
  categories,
  selectedFeed,
  onSelectFeed,
  handleDeleteFeed,
  handleEditFeed,
  onShowAll,
  onShowSaved,
  onReorderCategories,
  savedCount,
  unreadCount,
  renameCategory,
  removeCategory,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [openCategories, setOpenCategories] = useState(new Set());

  const [openMenu, setOpenMenu] = useState(null);
  const navButton = (active) => `
    flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm
    transition-colors duration-150 bg-blue-50
    ${active ? "bg-blue-100 font-semibold text-blue-700" : "hover:bg-gray-100 text-gray-700"}
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
    active:bg-gray-200
    `;
  const feedsByCategory = useMemo(() => {
    return feeds.reduce((acc, feed) => {
      const key = feed.category || "Feed";

      if (!acc[key]) acc[key] = [];

      acc[key].push(feed);

      return acc;
    }, {});
  }, [feeds]);

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
  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;

    onReorderCategories(active.id, over.id);
  }

  return (
    <aside
      className={`
    fixed inset-y-0 left-0 z-50 w-full md:w-[18rem] bg-white border-r border-gray-300
    transform transition-transform duration-300 flex flex-col justify-between
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0
  `}
    >
      <div>
        <nav className="space-y-2 py-6 mx-4 border-b border-b-gray-300">
          <div className="flex items-center justify-between border-b p-4 md:hidden">
            <h2 className="font-semibold">Feeds</h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <FiX />
            </button>
          </div>
          <button onClick={onShowAll} className={navButton(view === "all")}>
            <span className="flex text-sm items-center gap-3">
              <FiHome />
              All Items
            </span>

            <span
              className="flex h-5 w-5 items-center justify-center rounded-full 
            bg-blue-600 text-xs font-medium text-white"
            >
              {unreadCount}
            </span>
          </button>
          <button onClick={onShowSaved} className={navButton(view === "saved")}>
            <span className="flex text-sm items-center gap-3">
              <FiBookmark />
              Saved
            </span>

            <span
              className="flex h-5 w-5 items-center justify-center rounded-full 
            bg-gray-500 text-xs font-medium text-white"
            >
              {savedCount}
            </span>
          </button>
        </nav>

        <div className="py-6 mx-4 ">
          <div className="mb-4 flex items-center justify-between ">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories
            </h2>
          </div>

          <div className="space-y-2">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {categories.map((category) => {
                  const categoryFeeds =
                    feedsByCategory[category.category] ?? [];

                  return (
                    <SidebarCategory
                      key={category.id}
                      category={category}
                      feeds={categoryFeeds}
                      selectedFeed={selectedFeed}
                      isOpen={openCategories.has(category.category)}
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                      toggleCategory={toggleCategory}
                      onSelectFeed={onSelectFeed}
                      handleEditFeed={handleEditFeed}
                      handleDeleteFeed={handleDeleteFeed}
                      getCategoryColor={getCategoryColor}
                      renameCategory={renameCategory}
                      removeCategory={removeCategory}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-2 mx-3 py-3 
          text-sm bg-gray-50 text-green-700 border-t border-t-gray-300"
      >
        <FiCheckCircle /> All feeds are healthy
      </div>
    </aside>
  );
}
