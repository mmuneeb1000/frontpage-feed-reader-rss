export default function ArticleToolbar({
  title,
  articles,
  onMarkAllRead,
  showMarkAllRead,
  count,
}) {
  return (
    <section
      className="sticky top-0 z-10 flex items-center 
    justify-between border-b border-gray-300 px-4 py-3 bg-white"
    >
      <div className="flex gap-4 justify-between items-center bg-white px-2 py-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{count} unread</p>
      </div>
      {showMarkAllRead && (
        <button
          onClick={() => onMarkAllRead(articles)}
          className="rounded-md px-2 border border-gray-300 py-1 text-sm hover:bg-gray-100"
        >
          Mark all as read
        </button>
      )}
    </section>
  );
}
