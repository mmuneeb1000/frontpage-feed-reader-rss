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
  feeds,
  categories,
  selectedFeed,
  onSelectFeed,
  handleClearFeeds,
  handleDeleteFeed,
  handleEditFeed,
  onShowAll,
  onShowSaved,
  onReorderCategories,
}) {
  const [openCategories, setOpenCategories] = useState(new Set());

  const [openMenu, setOpenMenu] = useState(null);
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
    <aside className="flex justify-between h-full w-72 flex-col border-r border-gray-300 bg-gray-50">
      <div>
        <nav className="py-6 mx-4 border-b border-b-gray-300">
          <button
            onClick={onShowAll}
            className="flex w-full items-center justify-between rounded-lg bg-blue-50 
        px-3 py-2 text-left font-semibold text-blue-700 hover:bg-blue-200"
          >
            <span className="flex text-sm items-center gap-3">
              <FiHome />
              All Items
            </span>

            <span className="text-sm">{feeds.length}</span>
          </button>

          <button
            onClick={onShowSaved}
            className="mt-2 flex text-sm w-full items-center gap-3 
        rounded-lg px-3 py-2 text-left hover:bg-gray-100"
          >
            <FiBookmark />
            Saved
          </button>
        </nav>

        <div className="py-6 mx-4 ">
          <div className="mb-4 flex items-center justify-between ">
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
