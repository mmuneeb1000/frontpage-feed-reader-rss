import { useState } from "react";

export default function ImportJSON({ onImport }) {
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
    <section className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Import JSON</h2>

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
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Import
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </section>
  );
}
