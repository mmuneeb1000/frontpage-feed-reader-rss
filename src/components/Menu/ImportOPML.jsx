import { XMLParser } from "fast-xml-parser";
import { useState } from "react";

export default function ImportOPML({ onImport, onClose }) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("loading");
    setProgress(10);
    setMessage("Reading file...");

    const text = await file.text();

    setProgress(35);
    setMessage("Parsing OPML...");

    const xml = parser.parse(text);

    const outlines = xml?.opml?.body?.outline ?? [];

    const feeds = [];

    function walk(items, category = "") {
      if (!items) return;

      const list = Array.isArray(items) ? items : [items];

      for (const item of list) {
        const currentCategory = item.xmlUrl
          ? category
          : item.title || item.text || category;

        if (item.xmlUrl) {
          feeds.push({
            title: item.title || item.text,
            link: item.xmlUrl,
            category: currentCategory,
            description: item.description || "",
          });
        }

        if (item.outline) {
          walk(item.outline, currentCategory);
        }
      }
    }

    walk(outlines);

    setProgress(70);
    setMessage(`Importing ${feeds.length} feeds...`);

    await onImport(feeds);

    setProgress(100);
    setMessage(`Successfully imported ${feeds.length} feeds.`);
    setStatus("success");

    setTimeout(() => {
      onClose();
    }, 1200);
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl border border-gray-300 p-6 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Import OPML</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Upload an OPML file exported from another RSS reader.
        </p>

        <input
          type="file"
          accept=".opml,.xml"
          onChange={handleFile}
          className="mt-4"
        />
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
      </div>
    </section>
  );
}
