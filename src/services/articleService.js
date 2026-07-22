export async function getArticles(feedUrl) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/articles?url=${encodeURIComponent(feedUrl)}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        data: [],
        error: data.message,
      };
    }

    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: [],
      error: "Unable to connect to the server.",
    };
  }
}
