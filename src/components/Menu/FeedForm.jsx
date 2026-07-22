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

    if (!feed || feed.link !== form.link) {
      const { error } = await getArticles(form.link);

      if (error) {
        setError(error);
        return;
      }
    }

    await onSubmit({
      ...form,
      category: form.category.trim() || "Feed",
    });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-200 space-y-3 rounded-xl border border-gray-500 p-6 bg-white"
      >
        <div className="flex items-center justify-between">
          <h2>{feed ? "Edit Feed" : "Add Feed"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 p-3"
          required
        />
        <input
          name="link"
          type="url"
          placeholder="RSS URL"
          value={form.link}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 p-3"
          required
        />
        {error && <p className="mx-2 text-sm text-red-500">{error}</p>}
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 p-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded border border-gray-400 p-3"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-400 px-5 py-3 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {feed ? "Save Changes" : "Add Feed"}
          </button>
        </div>
      </form>
    </div>
  );
}
