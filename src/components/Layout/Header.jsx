import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import UserMenu from "./UserMenu";

export default function Header({
  children,
  actions,
  demo = false,
  setSidebarOpen,
}) {
  const { user, signOut } = useAuth();
  const { full_name } = user?.user_metadata ?? {};

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
              aria-label="Open sidebar"
            >
              <TbLayoutSidebarLeftExpand size={22} />
            </button>
          )}

          <Link
            to={user ? "/dashboard" : "/"}
            className="text-xl font-semibold"
          >
            Frontpage
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
              <div className="block">{actions}</div>

              <UserMenu
                user={user}
                full_name={full_name}
                signOut={signOut}
                actions={actions}
              />
            </>
          ) : (
            <>
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  to="/login"
                  className="rounded-md px-4 py-2 transition hover:bg-gray-100"
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

              <UserMenu demo={demo} />
            </>
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
