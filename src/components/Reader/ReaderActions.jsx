import { FiBookmark, FiExternalLink } from "react-icons/fi";
import TryDemo from "../TryDemo";

export default function ReaderActions({
  demo,
  article,
  onToggleSaved,
  isSaved,
}) {
  const saved = isSaved(article);

  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row">
      <div className="inline-flex gap-6 ">
        <TryDemo
          demo={demo}
          title="Bookmark articles"
          message="Sign up to save articles for later."
        >
          <button
            onClick={() => onToggleSaved(article)}
            className={`flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 
          transition hover:bg-neutral-100 focus:ring-2 focus:ring-blue-500 active:scale-95 ${
            saved ? "border-blue-300 bg-blue-50 text-blue-700" : ""
          }`}
          >
            <FiBookmark className={saved ? "fill-current text-blue-600" : ""} />
          </button>
        </TryDemo>
        <a
          href={article.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-blue-600 
        px-4 py-2 text-white transition hover:bg-blue-700 focus:ring-2 
        focus:ring-blue-500 active:scale-95"
        >
          <FiExternalLink />
          Open
        </a>
      </div>
    </div>
  );
}
