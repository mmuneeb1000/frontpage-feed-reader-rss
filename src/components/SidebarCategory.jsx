import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";

export default function SidebarCategory({
  category,
  feeds,
  selectedFeed,
  isOpen,
  openMenu,
  setOpenMenu,
  toggleCategory,
  onSelectFeed,
  handleEditFeed,
  handleDeleteFeed,
  getCategoryColor,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: category.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <button
        onClick={() => toggleCategory(category.category)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold uppercase text-neutral-900 hover:bg-gray-100"
      >
        <button
          {...attributes}
          {...listeners}
          title="Drag to reorder"
          aria-label="Drag to reorder category"
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab touch-none rounded p-1 text-gray-400 hover:bg-gray-200"
        >
          <LuGripVertical className="h-4 w-4" />
        </button>

        <span
          className={`h-2.5 w-2.5 rounded-full ${getCategoryColor(category.category)}`}
        />

        <span className="flex-1 text-left">{category.category}</span>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1">
          {feeds.map((feed) => (
            <div key={feed.id} className="relative flex items-center gap-2">
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

                <span className="truncate">{feed.title}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === feed.id ? null : feed.id);
                }}
                className="rounded p-2 text-gray-500 hover:bg-gray-100"
              >
                <FiMoreVertical />
              </button>

              {openMenu === feed.id && (
                <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setOpenMenu(null);
                      handleEditFeed(feed);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setOpenMenu(null);
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
