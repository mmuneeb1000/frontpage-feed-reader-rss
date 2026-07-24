import { useEffect, useRef, useState } from "react";

export default function UserMenu({
  user,
  full_name,
  signOut,
  handleClearFeeds,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const initials =
    user?.user_metadata?.full_name
      ?.split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("") ?? "?";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 text-sm font-semibold uppercase text-white shadow-md ring-2 ring-indigo-100"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b p-4">
            <p className="font-medium text-gray-900">{full_name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            disabled
            className="flex w-full items-center px-4 py-3 text-left text-sm text-gray-400"
          >
            Account Settings
            <span className="ml-auto rounded bg-gray-100 px-2 py-0.5 text-xs">
              Soon
            </span>
          </button>

          <button
            disabled
            className="flex w-full items-center px-4 py-3 text-left text-sm text-gray-400"
          >
            Preferences
            <span className="ml-auto rounded bg-gray-100 px-2 py-0.5 text-xs">
              Soon
            </span>
          </button>

          {handleClearFeeds && (
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to clear all feeds?")
                ) {
                  handleClearFeeds();
                  setOpen(false);
                }
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Clear All Feeds
            </button>
          )}

          <div className="border-t">
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
