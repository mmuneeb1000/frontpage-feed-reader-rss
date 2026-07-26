import { Link } from "react-router-dom";

export default function TryDemo({
  demo,
  children,
  title = "Feature unavailable",
  message = "Create an account to use this feature.",
}) {
  if (!demo) {
    return children;
  }

  return (
    <div className="group relative  ">
      <div className="cursor-not-allowed opacity-60">{children}</div>

      <div
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden
        w-36 -translate-x-1/2 rounded-xl border border-gray-700 bg-gray-900
        p-3 text-left shadow-xl group-hover:block group-focus-within:block"
      >
        <p className="mb-1 text-sm font-medium text-white">{title}</p>

        <p className="text-xs leading-5 text-gray-300">{message}</p>

        <Link
          to="/register"
          className="pointer-events-auto mt-3 inline-block rounded-md
          bg-blue-600 px-3 py-1.5 text-xs font-medium text-white
          hover:bg-blue-700"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
