import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import FloatingRSS from "../components/Layout/FloatingRSS";
import {
  FiArrowRight,
  FiBookmark,
  FiGrid,
  FiLogIn,
  FiUpload,
  FiRss,
} from "react-icons/fi";

export default function Landing() {
  const features = [
    {
      icon: FiRss,
      title: "RSS Aggregation",
      description: "Subscribe to blogs, news sites and podcasts in one place.",
    },
    {
      icon: FiUpload,
      title: "Import OPML",
      description: "Bring your existing subscriptions in seconds.",
    },
    {
      icon: FiBookmark,
      title: "Save Articles",
      description: "Build your own reading list and revisit articles later.",
    },
    {
      icon: FiGrid,
      title: "Organize Feeds",
      description:
        "Group feeds into categories and reorder them however you like.",
    },
  ];
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-neutral-50">
      <Header publicPage />

      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        <FloatingRSS />
        <div className="relative z-10 text-center">
          <div
            className="mb-4
            flex w-50 mx-auto
            justify-center rounded-full
            border border-blue-200
            bg-blue-50
            px-4 py-1
            text-sm
            text-blue-700
            transition
            hover:scale-105
            hover:bg-blue-100"
          >
            Modern RSS Reader
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight animate-fade-up">
            Read everything from one clean dashboard.
          </h1>

          <p className="mt-6 max-w-2xl text-lg mx-auto  text-center text-neutral-600">
            Organize feeds, import OPML files, save articles, and stay updated
            without algorithms deciding what you should read.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/demo"
              className="group
              flex items-center gap-2
              rounded-xl bg-blue-600
              px-6 py-3 text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-blue-700
              hover:shadow-xl hover:shadow-blue-200
              active:translate-y-0
              active:scale-95
              focus:outline-none
              focus:ring-4
              focus:ring-blue-300"
            >
              Try Demo
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/register"
              className="
              rounded-xl
              border border-neutral-300
              bg-white
              px-6 py-4
              transition-all duration-300
              hover:-translate-y-1
              hover:border-blue-300
              hover:bg-blue-50
              hover:shadow-lg
              active:scale-95
              focus:outline-none
              focus:ring-4
              focus:ring-blue-200
              "
            >
              Create Account
            </Link>
          </div>

          <p className="mt-5 text-sm text-neutral-500">
            No sign up required to explore the demo.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <Icon className="mb-4 text-2xl text-blue-600" />

            <h3 className="mb-2 font-semibold">{title}</h3>

            <p className="text-sm text-neutral-600">{description}</p>
          </div>
        ))}
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
              className="group
              flex items-center gap-2
              rounded-xl bg-blue-600
              
              px-6 py-3 text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-blue-700
              hover:shadow-xl hover:shadow-blue-200
              active:translate-y-0
              active:scale-95
              focus:outline-none
              focus:ring-4
              focus:ring-blue-300"
            >
              Try Demo
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/login"
              className="group
              flex items-center gap-2
              rounded-xl bg-white
              px-6 py-3
              border border-neutral-300
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-white
              hover:border-blue-300
              hover:bg-blue-50
              hover:shadow-lg
              active:translate-y-0
              active:scale-95
              focus:outline-none
              focus:ring-4
              focus:ring-blue-300"
            >
              <FiLogIn className="transition-transform duration-300 group-hover:-translate-x-1" />
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
