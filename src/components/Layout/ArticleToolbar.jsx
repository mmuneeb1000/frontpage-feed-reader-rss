import TryDemo from "../TryDemo";
export default function ArticleToolbar({
  demo,
  title,
  articles,
  onMarkAllRead,
  showMarkAllRead,
  unreadCount,
}) {
  return (
    <section
      className="sticky top-0 z-10 flex items-center 
    justify-between border-b border-gray-300 px-4 py-2 bg-white"
    >
      <div className="flex gap-4 justify-between items-center bg-white px-2 py-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{unreadCount} unread</p>
      </div>
      <TryDemo
        demo={demo}
        title="Reading Status"
        message="Sign up to mark all as read."
      >
        {showMarkAllRead && (
          <button
            onClick={() => onMarkAllRead(articles)}
            className="rounded-md px-2 border border-gray-300 py-1 text-sm hover:bg-gray-100"
          >
            Mark all as read
          </button>
        )}
      </TryDemo>
    </section>
  );
}
