export default function LoadingState({ type = "articles", rows = 8 }) {
  if (type === "reader") {
    return (
      <div className="animate-pulse space-y-6 p-6">
        <div className="h-8 w-3/4 rounded bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        <div className="h-64 rounded-xl bg-gray-200" />

        <div className="space-y-3">
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 w-11/12 rounded bg-gray-200" />
          <div className="h-4 w-10/12 rounded bg-gray-200" />
          <div className="h-4 w-9/12 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (type === "sidebar") {
    return (
      <div className="animate-pulse space-y-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg p-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 flex-1 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, i) => (
        <article key={i} className="animate-pulse space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>

          <div className="h-6 w-4/5 rounded bg-gray-200" />

          <div className="space-y-2">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        </article>
      ))}
    </div>
  );
}
