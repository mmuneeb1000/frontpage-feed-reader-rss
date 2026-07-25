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
  const [results, setResults] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatus("loading");
      setResults(null);

      setProgress(10);
      setMessage("Reading OPML file...");

      const text = await file.text();

      setProgress(35);
      setMessage("Parsing feeds...");

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
              title: item.title || item.text || "Untitled Feed",
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

      const results = await onImport(feeds);

      setResults(results);

      setProgress(100);
      setStatus("success");

      setMessage(
        `Imported ${results.imported.length} of ${feeds.length} feeds`,
      );
    } catch (error) {
      console.error(error);

      setStatus("error");
      setProgress(100);
      setMessage(error.message || "Unable to import OPML file.");
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Import OPML</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
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
          disabled={status === "loading"}
          className="mt-5 block w-full text-sm"
        />

        {status !== "idle" && (
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>{message}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-300 ${
                  status === "error" ? "bg-red-500" : "bg-blue-600"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {results && (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-green-200 bg-green-50 p-2">
                <p className="text-xl font-semibold text-green-700">
                  {results.imported.length}
                </p>
                <p className="text-sm text-green-700">Imported</p>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-xl font-semibold text-yellow-700">
                  {results.skipped.length}
                </p>
                <p className="text-sm text-yellow-700">Skipped</p>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-xl font-semibold text-red-700">
                  {results.failed.length}
                </p>
                <p className="text-sm text-red-700">Failed</p>
              </div>
            </div>

            {results.imported.length > 0 && (
              <details open>
                <summary className="cursor-pointer font-medium text-green-700">
                  Imported ({results.imported.length})
                </summary>

                <ul className="mt-3 max-h-40 overflow-y-auto rounded-lg border">
                  {results.imported.map((feed) => (
                    <li
                      key={feed.link}
                      className="border-b px-4 py-2 last:border-b-0"
                    >
                      <p className="font-medium">{feed.title}</p>
                      <p className="truncate text-xs text-gray-500">
                        {feed.link}
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {results.skipped.length > 0 && (
              <details open>
                <summary className="cursor-pointer font-medium text-yellow-700">
                  Skipped ({results.skipped.length})
                </summary>

                <ul className="mt-2 max-h-36 overflow-y-auto rounded-lg border border-gray-300">
                  {results.skipped.map((feed) => (
                    <li
                      key={feed.link}
                      className="border-b border-gray-300 px-4 py-2 last:border-b-0"
                    >
                      <p className="font-medium">{feed.title}</p>

                      <p className="text-xs text-yellow-700">{feed.reason}</p>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {results.failed.length > 0 && (
              <details open>
                <summary className="cursor-pointer font-medium text-red-700">
                  Failed ({results.failed.length})
                </summary>

                <ul className="mt-3 max-h-36 overflow-y-auto rounded-lg border border-gray-300">
                  {results.failed.map((feed) => (
                    <li
                      key={feed.link}
                      className="border-b border-gray-300 px-4 py-2 last:border-b-0"
                    >
                      <p className="font-medium">{feed.title}</p>

                      <p className="truncate text-xs text-gray-500">
                        {feed.link}
                      </p>

                      <p className="text-xs text-red-600">{feed.reason}</p>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
