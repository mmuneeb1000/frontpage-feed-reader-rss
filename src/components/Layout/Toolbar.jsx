export default function Toolbar({ title = "All Items", count = 0 }) {
  return (
    <section className="sticky top-0 z-10 border-b border-gray-300 bg-white px-6 py-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">
        {count} {count === 1 ? "article" : "articles"}
      </p>
    </section>
  );
}
