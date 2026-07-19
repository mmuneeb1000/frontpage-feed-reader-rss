import { XMLParser } from "fast-xml-parser";

export default function ImportOPML({ onImport }) {
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

    function walk(items) {
      if (!items) return;

      const list = Array.isArray(items) ? items : [items];

      for (const item of list) {
        if (item.xmlUrl) {
          feeds.push({
            title: item.title || item.text,
            link: item.xmlUrl,
            category: item.category || "",
            description: "",
          });
        }

        if (item.outline) {
          walk(item.outline);
        }
      }
    }

    walk(outlines);

    onImport(feeds);
  }

  return (
    <section className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Import OPML</h2>

      <p className="mt-2 text-sm text-gray-600">
        Upload an OPML file exported from another RSS reader.
      </p>

      <input
        type="file"
        accept=".opml,.xml"
        onChange={handleFile}
        className="mt-4"
      />
    </section>
  );
}
