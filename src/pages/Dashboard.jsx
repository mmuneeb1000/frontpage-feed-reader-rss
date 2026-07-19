import { useEffect, useState } from "react";
import Header from "../components/Header";
import FeedForm from "../components/FeedForm";
import ImportOPML from "../components/ImportOPML";
import { useAuth } from "../context/AuthContext";
import { getFeeds, createFeed } from "../services/feedService";

export default function Dashboard() {
  const { user } = useAuth();

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFeeds() {
    if (!user) return;

    const { data, error } = await getFeeds(user.id);

    if (!error) {
      setFeeds(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadFeeds();
  }, [user]);

  async function handleCreate(feed) {
    const { error } = await createFeed({
      ...feed,
      user_id: user.id,
    });

    if (!error) {
      loadFeeds();
    }
  }

  async function handleImport(importedFeeds) {
    for (const feed of importedFeeds) {
      await createFeed({
        ...feed,
        user_id: user.id,
      });
    }

    loadFeeds();
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-12">
        <section>
          <h1 className="text-4xl font-semibold">Dashboard</h1>

          <p className="mt-2 text-gray-600">Welcome back, {user?.email}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FeedForm onSubmit={handleCreate} />

          <ImportOPML onImport={handleImport} />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">Your Feeds</h2>

          {loading ? (
            <p>Loading...</p>
          ) : feeds.length === 0 ? (
            <p>No feeds yet.</p>
          ) : (
            <div className="grid gap-4">
              {feeds.map((feed) => (
                <article key={feed.id} className="rounded-xl border p-5">
                  <h3 className="text-lg font-semibold">{feed.title}</h3>

                  {feed.category && (
                    <p className="mt-1 text-sm text-gray-500">
                      {feed.category}
                    </p>
                  )}

                  {feed.description && (
                    <p className="mt-3 text-gray-600">{feed.description}</p>
                  )}

                  <a
                    href={feed.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-green-600 hover:underline"
                  >
                    Visit Feed
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
