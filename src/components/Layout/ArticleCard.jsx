import { FiBookmark } from "react-icons/fi";

export default function ArticleCard({
  article,
  saved,
  onToggleSaved,
  selected,
  onSelect,
}) {
  return (
    <div
      onClick={() => onSelect?.(article)}
      className={`flex gap-4 border-b border-gray-200 p-5 transition ${
        article.read
          ? "border-gray-200 bg-gray-50"
          : "border-blue-200 bg-white shadow-sm"
      }`}
    >
      <div className="w-full">
        <div className="mb-2 flex gap-5 items-center">
          <span
            className={`h-3 w-3 rounded-full ${
              !article.read ? "bg-blue-600" : "bg-gray-400"
            }`}
          />

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <img src={article.favicon} alt="" className="h-4 w-4 shrink-0" />

            <span className="truncate">
              {article.feedTitle || article.feed_title}
            </span>

            <span>•</span>

            <span>{new Date(article.published).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="ml-8 flex flex-col">
          <div className="flex gap-4 items-start">
            <button onClick={() => onSelect?.(article)} className="text-left">
              <h3
                className={`line-clamp-2 text-lg font-semibold ${
                  article.read
                    ? "font-normal text-gray-500"
                    : "font-bold text-gray-900"
                }`}
              >
                {article.title}
              </h3>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSaved(article);
              }}
              className="mt-1 rounded text-gray-400 hover:bg-gray-100 hover:text-blue-600"
            >
              <FiBookmark
                className={`h-5 w-5 ${saved ? "fill-current text-blue-600" : ""}`}
              />
            </button>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}
