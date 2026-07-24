import { useMemo } from "react";
import Fuse from "fuse.js";

export default function useSearch(items = [], query = "") {
  return useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const fuse = new Fuse(items, {
      keys: [
        "title",
        "description",
        "content",
        "author",
        "feedTitle",
        "feed_title",
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    return fuse.search(query).map((result) => result.item);
  }, [items, query]);
}
