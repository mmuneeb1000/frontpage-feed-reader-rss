import ReaderHeader from "./ReaderHeader";
import ReaderActions from "./ReaderActions";
import ReaderContent from "./ReaderContent";
import { FiX } from "react-icons/fi";

export default function ReaderView({
  demo,
  article,
  onBack,
  onToggleSaved,
  isSaved,
}) {
  if (!article) {
    return (
      <div
        className="flex h-full border-l border-l-gray-300 items-center justify-center 
      p-6 text-center text-neutral-500"
      >
        Select an article to read
      </div>
    );
  }

  return (
    <article className="border border-gray-300 mx-auto px-4 py-5 md:px-6 md:py-6 overflow-y-auto ">
      <div className="flex justify-end">
        <button
          onClick={onBack}
          title="Close Reader's View"
          aria-label="Click to close readers view"
          className="mb-2 flex items-center gap-2 text-sm 
        transition hover:bg-neutral-100 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 active:scale-95"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
      <ReaderHeader article={article} />

      <ReaderActions
        demo={demo}
        article={article}
        onToggleSaved={onToggleSaved}
        isSaved={isSaved}
      />

      <ReaderContent article={article} image={article.image} />
    </article>
  );
}
