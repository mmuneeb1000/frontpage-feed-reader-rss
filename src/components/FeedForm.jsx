import { useState } from "react";

export default function FeedForm({ onSubmit }) {
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
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Add Feed</h2>

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

      <button className="rounded bg-green-600 px-5 py-3 text-white">
        Save Feed
      </button>
    </form>
  );
}
