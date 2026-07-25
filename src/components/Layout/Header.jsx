import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import UserMenu from "./UserMenu";
import Logo from "/favicon.svg";

export default function Header({
  children,
  actions,
  demo = false,
  setSidebarOpen,
  handleClearFeeds,
}) {
  const { user, signOut } = useAuth();
  const { full_name } = user?.user_metadata ?? {};

  const isDemo = demo && !user;
  const base = isDemo ? "/demo" : "";

  function navClass({ isActive }) {
    return `rounded-lg px-3 py-2 text-sm transition ${
      isActive
        ? "bg-blue-100 font-medium text-blue-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
              aria-label="Open sidebar"
            >
              <TbLayoutSidebarLeftExpand className="h-5 w-5" />
            </button>
          )}

          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-3 text-xl font-semibold"
          >
            <img className="h-8 w-8" src={Logo} alt="Frontpage" />
            <span>Frontpage</span>
          </Link>
        </div>

        {user && (
          <div className="mx-8 hidden flex-1 justify-center md:flex">
            <div className="w-full max-w-lg">{children}</div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {actions}

              <UserMenu
                user={user}
                full_name={full_name}
                signOut={signOut}
                demo={false}
                handleClearFeeds={handleClearFeeds}
              />
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
                {demo ? "Create Account" : "Register"}
              </Link>
            </div>
          )}
        </div>
      </div>

      {user && (
        <div className="border-t border-gray-200 px-4 py-3 md:hidden">
          {children}
        </div>
      )}
    </header>
  );
}
