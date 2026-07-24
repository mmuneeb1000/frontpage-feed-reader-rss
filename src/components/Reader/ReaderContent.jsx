export default function ReaderContent({ article, image }) {
  return (
    <>
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="mb-8 mt-8 max-h-[500px] w-full rounded-xl object-cover"
        />
      )}

      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.content || article.description || "",
        }}
      />
    </>
  );
}
