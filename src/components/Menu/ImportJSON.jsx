import { useState } from "react";

export default function ImportJSON({ onImport, onClose }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  async function handleImport() {
    if (!file) return;

    try {
      setStatus("loading");

      setProgress(15);
      setMessage("Reading file...");

      const text = await file.text();

      setProgress(40);
      setMessage("Parsing JSON...");

      const data = JSON.parse(text);

      const feeds = normalizeJsonFeeds(data);

      setProgress(70);
      setMessage(`Importing ${feeds.length} feeds...`);

      await onImport(feeds);

      setProgress(100);
      setStatus("success");
      setMessage(`Successfully imported ${feeds.length} feeds.`);

      setTimeout(onClose, 1200);
    } catch (err) {
      setStatus("error");
      setProgress(0);
      setMessage("");
      setError(err.message);
    }
  }
  function normalizeJsonFeeds(data) {
    if (Array.isArray(data)) {
      return data;
    }

    const categories = data?.categories;

    if (Array.isArray(categories)) {
      return categories.flatMap((category) =>
        (category.feeds || []).map((feed) => ({
          title: feed.title,
          link: feed.feedUrl,
          category: category.name,
          description: feed.description || "",
        })),
      );
    }

    if (Array.isArray(data?.feeds)) {
      return data.feeds;
    }

    console.log("Imported JSON:", data);

    throw new Error(
      "Unsupported JSON format. Expected categories[] or feeds[].",
    );
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="w-full max-w-md rounded-xl border 
        border-gray-300 bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Import JSON</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-4"
        />

        <button
          type="button"
          onClick={handleImport}
          disabled={!file || status === "loading"}
          className="mt-4 rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
        >
          {status === "loading" ? "Importing..." : "Import"}
        </button>

        {status !== "idle" && (
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span>{message}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-300 ${
                  status === "success" ? "bg-green-500" : "bg-blue-600"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </section>
  );
}
