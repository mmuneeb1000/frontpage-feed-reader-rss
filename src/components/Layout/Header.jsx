import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";

export default function Header({
  children,
  demo = false,
  publicPage = false,
  handleClearFeeds,
  setSidebarOpen,
}) {
  const { user, signOut } = useAuth();
  const { first_name, last_name, full_name } = user?.user_metadata ?? {};
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between px-6 py-2">
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex text-xl font-semibold"
        >
          <span className="w-8 flex">
            <img src="/favicon.svg" />
          </span>
          <div className="p-2">Frontpage</div>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          <FiMenu size={22} />
        </button>

        <nav className="flex gap-4 justify-between items-center">
          {children}
          <ul className="flex items-center gap-4">
            {demo ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="rounded-md px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Create Account
                  </Link>
                </li>
              </>
            ) : !user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="rounded-md px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="relative" ref={menuRef}>
                  <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 text-sm font-semibold uppercase text-white shadow-md ring-2 ring-indigo-100"
                  >
                    {user?.user_metadata?.full_name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")}
                  </button>

                  {open && (
                    <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      <div className="border-b border-gray-100 p-4">
                        <p className="font-medium text-gray-900">{full_name}</p>
                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
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
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to clear all feeds?",
                            )
                          ) {
                            handleClearFeeds();
                            setOpen(false);
                          }
                        }}
                        className="flex w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        Clear All Feeds
                      </button>

                      <div className="border-t border-gray-100">
                        <button
                          onClick={signOut}
                          className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
