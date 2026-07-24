import { FiBookmark, FiExternalLink } from "react-icons/fi";

export default function ReaderActions({ article, onToggleSaved, isSaved }) {
  const saved = isSaved(article);

  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row">
      <button
        onClick={() => onToggleSaved(article)}
        className={`flex items-center gap-2 rounded-lg md:w-auto border px-4 py-2 
          transition hover:bg-neutral-100 focus:ring-2 focus:ring-blue-500 active:scale-95 ${
            saved ? "border-blue-300 bg-blue-50 text-blue-700" : ""
          }`}
      >
        <FiBookmark className={saved ? "fill-current text-blue-600" : ""} />
        {saved ? "Saved" : "Save"}
      </button>

      <a
        href={article.link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-lg bg-blue-600 
        px-4 py-2 text-white transition hover:bg-blue-700 focus:ring-2 
        focus:ring-blue-500 active:scale-95 md:w-auto"
      >
        <FiExternalLink />
        Open
      </a>
    </div>
  );
}
