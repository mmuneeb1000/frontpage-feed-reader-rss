import { Link } from "react-router";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "./UserMenu";
import Logo from "/favicon.svg";
import TryDemo from "../TryDemo";

export default function Header({
  children,
  actions,
  demo = false,
  page = "feed",
  setSidebarOpen,
  handleClearFeeds,
}) {
  const { user, signOut } = useAuth();
  const { full_name } = user?.user_metadata ?? {};

  const showDashboard = user || demo;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            to={showDashboard ? "/dashboard" : "/"}
            className="flex items-center gap-3 text-xl font-semibold"
          >
            <img src={Logo} alt="Frontpage" className="h-8 w-8" />

            <span>Frontpage</span>
          </Link>
        </div>

        {showDashboard && (
          <div className="mx-8 hidden flex-1 md:flex">
            <div className="w-full">{children}</div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {showDashboard && page === "feeds" && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
              aria-label="Open sidebar"
            >
              <TbLayoutSidebarLeftExpand size={22} />
            </button>
          )}
          {showDashboard ? (
            <>
              {actions}

              {user && (
                <UserMenu
                  user={user}
                  full_name={full_name}
                  signOut={signOut}
                  demo={demo}
                  handleClearFeeds={handleClearFeeds}
                />
              )}
            </>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {showDashboard && (
        <div className="border-t border-gray-200 px-4 py-3 md:hidden">
          {children}
        </div>
      )}
    </header>
  );
}
