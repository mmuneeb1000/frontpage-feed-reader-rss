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
          className="mb-6 mt-6 max-h-80 w-full rounded-xl object-cover 
          md:mb-8 md:mt-8 md:max-h-[500px]"
        />
      )}

      <div
        className="mt-2 prose prose-sm max-w-none md:prose-base"
        dangerouslySetInnerHTML={{
          __html: article.content || article.description || "",
        }}
      />
    </>
  );
}
