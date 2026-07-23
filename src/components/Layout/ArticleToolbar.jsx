export default function ArticleToolbar({ articles, onMarkAllRead }) {
  const unreadCount = articles.filter((article) => !article.read).length;

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <span className="text-sm text-gray-500">{unreadCount} unread</span>

      <button
        onClick={() => onMarkAllRead(articles)}
        disabled={!unreadCount}
        className="rounded-md px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
      >
        Mark all as read
      </button>
    </div>
  );
}
