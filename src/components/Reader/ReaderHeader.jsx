export default function ReaderHeader({ article }) {
  return (
    <header>
      <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>

      <div className="mt-3 flex gap-3 text-sm text-neutral-500">
        <span>{article.feedTitle}</span>

        {article.published && (
          <time>{new Date(article.published).toLocaleDateString()}</time>
        )}
      </div>
    </header>
  );
}
