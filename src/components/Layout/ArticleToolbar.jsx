export default function ArticleToolbar({ articles, onMarkAllRead }) {
  return (
    <div className="flex items-center justify-center border-b px-4 py-3">
      <button
        onClick={() => onMarkAllRead(articles)}
        className="rounded-md px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
      >
        Mark all as read
      </button>
    </div>
  );
}
