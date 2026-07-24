import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";

export default function SidebarCategory({
  category,
  feeds,
  selectedFeed,
  isOpen,
  toggleCategory,
  onSelectFeed,
  handleEditFeed,
  handleDeleteFeed,
  getCategoryColor,
  renameCategory,
  removeCategory,
}) {
  const [openFeedMenu, setOpenFeedMenu] = useState(null);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: category.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          title="Drag to reorder"
          aria-label="Drag to reorder category"
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab touch-none rounded p-1 text-gray-400 hover:bg-gray-200"
        >
          <LuGripVertical />
        </button>

        <button
          onClick={() => toggleCategory(category.category)}
          className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold uppercase text-neutral-900 hover:bg-gray-100"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${getCategoryColor(
              category.category,
            )}`}
          />

          <span className="flex-1 text-left">{category.category}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenCategoryMenu((prev) => !prev);
          }}
          className="rounded p-2 text-gray-500 hover:bg-gray-100"
        >
          <FiMoreVertical />
        </button>

        {openCategoryMenu && (
          <div
            className="absolute right-0 top-10 z-50 w-40 overflow-hidden 
          rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <button
              onClick={() => {
                setOpenCategoryMenu(false);

                const newName = prompt("Rename category", category.category);

                if (!newName) return;

                renameCategory(category.id, newName);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              <FiEdit2 />
              Rename
            </button>

            <button
              onClick={() => {
                setOpenCategoryMenu(false);
                removeCategory(category.id);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className=" space-y-1 px-2 mt-2">
          {feeds.map((feed) => (
            <div key={feed.id} className="relative flex items-center">
              <button
                onClick={() => onSelectFeed(feed)}
                className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
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

                <span className="truncate text-[13px] font-semibold">
                  {feed.title}
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFeedMenu(openFeedMenu === feed.id ? null : feed.id);
                }}
                className="rounded p-2 text-gray-500 hover:bg-gray-100"
              >
                <FiMoreVertical />
              </button>

              {openFeedMenu === feed.id && (
                <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setOpenFeedMenu(null);
                      handleEditFeed(feed);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setOpenFeedMenu(null);
                      handleDeleteFeed(feed.id);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
