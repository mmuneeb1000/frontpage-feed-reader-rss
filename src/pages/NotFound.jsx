import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-blue-600">404</p>

        <h1 className="mt-2 text-5xl font-semibold">Page not found</h1>

        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
