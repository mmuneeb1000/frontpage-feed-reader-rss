import Header from "./Header";
import AddFeedMenu from "../Menu/AddFeedMenu";

export default function DashboardHeader(props) {
  return (
    <Header demo={props.demo}>
      <AddFeedMenu
        demo={props.demo}
        onCreateFeed={props.onCreateFeed}
        onImportOPML={props.onImportOPML}
        onImportJSON={props.onImportJSON}
      />
    </Header>
  );
}
