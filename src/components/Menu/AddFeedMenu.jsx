import { useState } from "react";
import { FiChevronDown, FiPlus, FiFileText, FiUpload } from "react-icons/fi";

export default function AddFeedMenu({
  onCreateFeed,
  onImportOPML,
  onImportJSON,
}) {
  const [open, setOpen] = useState(false);

  function handleClick(action) {
    setOpen(false);
    action();
  }

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg bg-white px-2 py-2 
        border border-neutral-400 text-neutral-900 hover:bg-blue-100"
      >
        <FiPlus />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-300 bg-white py-2 shadow-lg">
          <button
            onClick={() => handleClick(onCreateFeed)}
            className="flex w-full items-center gap-3 px-4 py-3 border-b border-neutral-300 text-left hover:bg-gray-100"
          >
            <FiPlus />
            Add Feed
          </button>

          <button
            onClick={() => handleClick(onImportOPML)}
            className="flex w-full items-center gap-3 px-4 py-3 border-b border-neutral-300 text-left hover:bg-gray-100"
          >
            <FiUpload />
            Import OPML
          </button>

          <button
            onClick={() => handleClick(onImportJSON)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100"
          >
            <FiFileText />
            Import JSON
          </button>
        </div>
      )}
    </div>
  );
}
