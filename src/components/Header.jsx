import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to={user ? "/dashboard" : "/login"}
          className="text-xl font-semibold"
        >
          RSS Feed
        </Link>

        <nav>
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
                <li className="text-sm text-gray-600">{user.email}</li>

                <li>
                  <button
                    onClick={signOut}
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
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
