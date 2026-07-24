import { useState, useEffect } from "react";
import { getArticles } from "../../services/articleService";

export default function FeedForm({ onSubmit, onClose, feed }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const feedData = {
      ...form,
      category: form.category.trim() || "Feed",
    };

    if (!feed || feed.link !== feedData.link) {
      const { error } = await getArticles(feedData.link);

      if (error) {
        setError(error);
        return;
      }
    }

    await onSubmit(feedData);

    setForm({
      title: "",
      description: "",
      link: "",
      category: "",
    });

    onClose();
  }

  useEffect(() => {
    if (feed) {
      setForm({
        title: feed.title,
        description: feed.description,
        link: feed.link,
        category: feed.category,
      });
    } else {
      setForm({
        title: "",
        description: "",
        link: "",
        category: "",
      });
    }

    setError("");
  }, [feed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-form-title"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="feed-form-title"
            className="text-xl font-semibold text-gray-900"
          >
            {feed ? "Edit Feed" : "Add Feed"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="feed-title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Feed Title
            </label>

            <input
              id="feed-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              aria-required="true"
              autoFocus
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="feed-link"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Feed URL
            </label>

            <input
              id="feed-link"
              name="link"
              type="url"
              value={form.link}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "feed-link-error" : undefined}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />

            {error && (
              <p
                id="feed-link-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="feed-category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <input
              id="feed-category"
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              placeholder="Feed"
              className="w-full rounded border border-gray-300 
                px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="feed-description"
              className="mt-2 mb-1 block text-sm font-medium text-gray-700"
            >
              Description (optional)
            </label>

            <textarea
              id="feed-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 
              px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-5 py-3 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              {feed ? "Save Changes" : "Add Feed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
