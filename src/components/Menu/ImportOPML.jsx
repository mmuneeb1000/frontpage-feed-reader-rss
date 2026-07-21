import { XMLParser } from "fast-xml-parser";

export default function ImportOPML({ onImport, onClose }) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  async function handleFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    const text = await file.text();

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

    console.log(feeds);
    onImport(feeds);
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl border p-6 bg-white">
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
      </div>
    </section>
  );
}
