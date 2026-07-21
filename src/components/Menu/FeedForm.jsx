import { useState } from "react";

export default function FeedForm({ onSubmit, onClose }) {
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

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(form);

    setForm({
      title: "",
      description: "",
      link: "",
      category: "",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border p-6 bg-white"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Feed</h2>
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
          className="w-full rounded border p-3"
          required
        />
        <input
          name="link"
          type="url"
          placeholder="RSS URL"
          value={form.link}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-5 py-3 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Save Feed
          </button>
        </div>
      </form>
    </div>
  );
}
