import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(items, pageSize = 20) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loaderRef = useRef(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
        }
      },
      {
        rootMargin: "200px",
      },
    );

    const node = loaderRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [items, pageSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    loaderRef,
    hasMore: visibleCount < items.length,
  };
}
