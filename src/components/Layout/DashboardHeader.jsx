import Header from "./Header";
import AddFeedMenu from "../Menu/AddFeedMenu";
import SearchBar from "../SearchBar";

export default function DashboardHeader({
  demo,
  handleClearFeeds,
  setSidebarOpen,
  onCreateFeed,
  onImportOPML,
  onImportJSON,
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
          onImportJSON={onImportJSON}
        />
      }
    >
      <SearchBar value={value} onChange={onChange} />
    </Header>
  );
}
