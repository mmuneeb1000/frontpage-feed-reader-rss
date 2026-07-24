export default function ReaderHeader({ article }) {
  return (
    <header>
      <h1 className="text-2xl font-bold leading-tight md:text-3xl">
        {article.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-500">
        <span>{article.feedTitle}</span>

        {article.published && (
          <time>{new Date(article.published).toLocaleDateString()}</time>
        )}
      </div>
    </header>
  );
}
