import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookmark,
  FiGrid,
  FiLogIn,
  FiRss,
  FiUpload,
} from "react-icons/fi";

export default function Landing() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <FiRss className="text-blue-600" />
            <span>Frontpage</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 hover:bg-neutral-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-4 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-700">
          Modern RSS Reader
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight">
          Read everything from one clean dashboard.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-neutral-600">
          Organize feeds, import OPML files, save articles, and stay updated
          without algorithms deciding what you should read.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/demo"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white transition hover:bg-blue-700"
          >
            Try Demo
            <FiArrowRight />
          </Link>

          <Link
            to="/register"
            className="rounded-xl border border-neutral-300 bg-white px-6 py-4 hover:bg-neutral-100"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-5 text-sm text-neutral-500">
          No sign up required to explore the demo.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <FiRss className="mb-4 text-2xl text-blue-600" />
          <h3 className="mb-2 font-semibold">RSS Aggregation</h3>
          <p className="text-sm text-neutral-600">
            Subscribe to blogs, news sites and podcasts in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <FiUpload className="mb-4 text-2xl text-blue-600" />
          <h3 className="mb-2 font-semibold">Import OPML</h3>
          <p className="text-sm text-neutral-600">
            Bring your existing subscriptions in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <FiBookmark className="mb-4 text-2xl text-blue-600" />
          <h3 className="mb-2 font-semibold">Save Articles</h3>
          <p className="text-sm text-neutral-600">
            Build your own reading list and revisit articles later.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <FiGrid className="mb-4 text-2xl text-blue-600" />
          <h3 className="mb-2 font-semibold">Organize Feeds</h3>
          <p className="text-sm text-neutral-600">
            Group feeds into categories and reorder them however you like.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Ready to build your own reading space?
          </h2>

          <p className="max-w-2xl text-neutral-600">
            Start with the demo, then create an account when you're ready to
            import your feeds, save articles and personalize your dashboard.
          </p>

          <div className="flex gap-4">
            <Link
              to="/demo"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Try Demo
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 hover:bg-neutral-100"
            >
              <FiLogIn />
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
