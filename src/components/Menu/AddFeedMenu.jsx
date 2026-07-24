import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiPlus, FiUpload, FiFileText } from "react-icons/fi";

export default function AddFeedMenu({ demo, onCreateFeed, onImportOPML }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const items = [
    {
      label: "Add Feed",
      icon: FiPlus,
      action: onCreateFeed,
    },
    {
      label: "Import OPML",
      icon: FiUpload,
      action: onImportOPML,
    },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(action) {
    setOpen(false);
    action?.();
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        disabled={demo}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-lg border border-neutral-300 
          bg-white px-3 py-2 text-sm font-medium 
          text-neutral-900 transition hover:bg-blue-50
          ${demo ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FiPlus className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          {items.map(({ label, icon: Icon, action }, index) => (
            <button
              key={label}
              onClick={() => handleSelect(action)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-100 ${
                index !== items.length - 1 ? "border-b border-neutral-200" : ""
              }`}
            >
              <Icon className="h-4 w-4 text-neutral-600" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
