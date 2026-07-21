export async function getArticles(feedUrl) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/articles?url=${encodeURIComponent(feedUrl)}`,
    );

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
}
