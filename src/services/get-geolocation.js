const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

const isAbortError = (error) => error?.name === "AbortError";

export const searchLocations = async (query, { signal } = {}) => {
  const name = query?.trim();
  if (!name) return [];

  const params = new URLSearchParams({
    name,
    count: "6",
    language: "en",
    format: "json",
  });

  let response;

  try {
    response = await fetch(`${GEOCODING_URL}?${params.toString()}`, { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new Error(
      "We could not reach the location service. Check your connection and try again.",
      { cause: error },
    );
  }

  if (!response.ok) {
    throw new Error(
      `The location service returned an error (${response.status}). Please try again.`,
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "We received an invalid response from the location service. Please try again.",
      { cause: error },
    );
  }

  if (!Array.isArray(data.results)) return [];

  return data.results
    .filter(
      (place) =>
        Number.isFinite(place.latitude) && Number.isFinite(place.longitude),
    )
    .map((place) => ({
      name: place.name || "Selected location",
      admin1: place.admin1 || "",
      country: place.country || "",
      countryCode: place.country_code || "",
      latitude: place.latitude,
      longitude: place.longitude,
      timezone: place.timezone || "",
    }));
};
