import { FiBookmark, FiExternalLink } from "react-icons/fi";
import Toolbar from "./Layout/Toolbar";
import ArticleCard from "./Layout/ArticleCard";
export default function AllItems({
  articles,
  loading,
  selectedArticle,
  onSelectArticle,
}) {
  if (loading) {
    return (
      <section className="overflow-y-auto">
        <p className="p-8 text-gray-500">Loading your feed...</p>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto">
      <Toolbar />

      {articles.map((article) => (
        <ArticleCard
          key={article.id || article.link}
          article={article}
          selected={selectedArticle?.link === article.link}
          onSelect={onSelectArticle}
        />
      ))}
    </section>
  );
}
