import { FiBookmark } from "react-icons/fi";

export default function ArticleCard({ article, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(article)}
      className={`flex gap-4 border-b border-gray-200 p-5 transition ${
        selected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-250">
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              //   onToggleBookmark?.(article);
            }}
            className="mt-1 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
          >
            <FiBookmark
              className={article.saved ? "fill-current text-blue-600" : ""}
            />
          </button>
          <img src={article.favicon} alt="" className="h-4 w-4 shrink-0" />

          <span className="truncate">{article.feedTitle}</span>

          <span>•</span>

          <span>{new Date(article.published).toLocaleDateString()}</span>
        </div>
        <div className="mx-10">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:underline"
          >
            <h3 className="line-clamp-2 text-lg font-semibold">
              {article.title}
            </h3>
          </a>

          <p className="mt-3 line-clamp-3 text-sm text-gray-600">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}
