const API_BASE_URL = "https://url-gami-api-130c6c04d757.herokuapp.com";

export const createShortUrl = async (originalUrl: string) => {
  const response = await fetch(`${API_BASE_URL}/shortener/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ original_url: originalUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create short URL");
  }

  return response.json();
};

export const getShortUrl = (shortCode: string) => {
  return `${API_BASE_URL}/shortener/${shortCode}`;
};
