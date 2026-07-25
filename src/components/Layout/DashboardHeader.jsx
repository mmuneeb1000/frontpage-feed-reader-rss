import { NavLink } from "react-router-dom";
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
      actions={
        <AddFeedMenu
          demo={demo}
          onCreateFeed={onCreateFeed}
          onImportOPML={onImportOPML}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-1">
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangePage(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === item.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <SearchBar value={value} onChange={onChange} />
      </div>
    </Header>
  );
}
