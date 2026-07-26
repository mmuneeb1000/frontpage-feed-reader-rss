import { FiRss, FiCompass, FiBookOpen } from "react-icons/fi";

const pages = [
  { id: "feeds", label: "Feeds", icon: FiRss },
  { id: "discover", label: "Discover", icon: FiCompass },
  { id: "digest", label: "Digest", icon: FiBookOpen },
];

export default function BottomNavigation({ page, onChangePage }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <ul className="grid grid-cols-3">
        {pages.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => onChangePage(id)}
              className={`flex w-full flex-col items-center gap-1 py-3 text-xs transition ${
                page === id
                  ? "text-violet-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
