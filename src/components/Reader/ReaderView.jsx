import ReaderHeader from "./ReaderHeader";
import ReaderActions from "./ReaderActions";
import ReaderContent from "./ReaderContent";

export default function ReaderView({
  article,
  onBack,
  onToggleSaved,
  isSaved,
}) {
  if (!article) {
    return (
      <div
        className="flex h-full items-center justify-center 
      p-6 text-center text-neutral-500"
      >
        Select an article to read
      </div>
    );
  }

  return (
    <article className="mx-auto px-4 py-5 md:px-6 md:py-6 overflow-y-auto">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm 
        transition hover:bg-neutral-100 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 active:scale-95"
      >
        ← Back
      </button>

      <ReaderHeader article={article} />

      <ReaderActions
        article={article}
        onToggleSaved={onToggleSaved}
        isSaved={isSaved}
      />

      <ReaderContent article={article} image={article.image} />
    </article>
  );
}
