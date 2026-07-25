import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function ReaderContent({ article, image }) {
  const [showImage, setShowImage] = useState(Boolean(image));

  useEffect(() => {
    setShowImage(Boolean(image));
  }, [image]);

  const content = DOMPurify.sanitize(
    article?.content || article?.description || "",
  );

  return (
    <>
      {showImage && image && (
        <img
          src={image}
          alt={article?.title || ""}
          loading="lazy"
          onError={() => setShowImage(false)}
          className="my-6 max-h-80 w-full rounded-xl object-cover md:my-8 md:max-h-[500px]"
        />
      )}

      <article
        className="prose prose-sm mt-2 max-w-none break-words prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-700 md:prose-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
