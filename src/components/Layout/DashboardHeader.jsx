import { NavLink } from "react-router";
import Header from "./Header";
import AddFeedMenu from "../Menu/AddFeedMenu";
import SearchBar from "../SearchBar";

const pages = [
  { id: "feeds", label: "Feeds" },
  { id: "discover", label: "Discover" },
  { id: "digest", label: "Digest" },
];

export default function DashboardHeader({
  page,
  onChangePage,
  demo,
  handleClearFeeds,
  setSidebarOpen,
  onCreateFeed,
  onImportOPML,
  value,
  onChange,
}) {
  return (
    <Header
      demo={demo}
      handleClearFeeds={handleClearFeeds}
      setSidebarOpen={setSidebarOpen}
      page={page}
      actions={
        <AddFeedMenu
          demo={demo}
          onCreateFeed={onCreateFeed}
          onImportOPML={onImportOPML}
        />
      }
    >
      <nav className="flex items-center justify-center md:justify-between">
        <div className="flex gap-4 hidden md:flex">
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangePage(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === item.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <SearchBar value={value} onChange={onChange} />
      </nav>
    </Header>
  );
}
