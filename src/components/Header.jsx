import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddFeedMenu from "./Menu/AddFeedMenu";

export default function Header({ onCreateFeed, onImportOPML, onImportJSON }) {
  const { user, signOut } = useAuth();
  const { first_name, last_name, full_name } = user?.user_metadata ?? {};

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between px-6 py-2">
        <Link
          to={user ? "/dashboard" : "/login"}
          className="flex text-xl font-semibold"
        >
          <span className="w-8 flex">
            <img src="/favicon.svg" />
          </span>
          <div className="p-2">Frontpage</div>
        </Link>

        <nav className="flex gap-4 justify-between items-center">
          <AddFeedMenu
            onCreateFeed={onCreateFeed}
            onImportOPML={onImportOPML}
            onImportJSON={onImportJSON}
          />
          <ul className="flex items-center gap-4">
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 text-sm font-semibold uppercase text-white shadow-md ring-2 ring-indigo-100">
                    {user?.user_metadata?.full_name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")}
                  </div>
                </li>

                <li>
                  <button
                    onClick={signOut}
                    className="rounded-md bg-red-600 px-2 py-1 text-white 
                    hover:bg-red-700 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
