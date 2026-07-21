import { useState } from "react";

export default function ImportJSON({ onImport, onClose }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  async function handleImport() {
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      onImport(data);

      setError("");
      setFile(null);
    } catch {
      setError("Invalid JSON file.");
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl border p-6 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Import JSON</h2>
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
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-4"
        />

        <button
          type="button"
          onClick={handleImport}
          disabled={!file}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Import
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}
      </div>
    </section>
  );
}
