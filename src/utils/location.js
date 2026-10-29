const LOCATION_STORAGE_KEY = "weather-app:last-location";

const cleanText = (value, maxLength = 120) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const validCoordinate = (value, min, max) =>
  Number.isFinite(value) && value >= min && value <= max;

export const normalizeLocation = (value) => {
  if (!value || typeof value !== "object") return null;

  const latitudeValue = value.latitude;
  const longitudeValue = value.longitude;

  if (
    latitudeValue === null ||
    latitudeValue === undefined ||
    String(latitudeValue).trim() === "" ||
    longitudeValue === null ||
    longitudeValue === undefined ||
    String(longitudeValue).trim() === ""
  ) {
    return null;
  }

  const latitude = Number(latitudeValue);
  const longitude = Number(longitudeValue);

  if (
    !validCoordinate(latitude, -90, 90) ||
    !validCoordinate(longitude, -180, 180)
  ) {
    return null;
  }

  return {
    name: cleanText(value.name) || "Selected location",
    admin1: cleanText(value.admin1),
    country: cleanText(value.country),
    countryCode: cleanText(value.countryCode, 8).toUpperCase(),
    latitude,
    longitude,
    timezone: cleanText(value.timezone),
  };
};

export const locationFromSearchParams = (searchParams) => {
  const latitudeValue = searchParams.get("lat");
  const longitudeValue = searchParams.get("lon");

  if (
    latitudeValue === null ||
    latitudeValue.trim() === "" ||
    longitudeValue === null ||
    longitudeValue.trim() === ""
  ) {
    return null;
  }

  const latitude = Number(latitudeValue);
  const longitude = Number(longitudeValue);

  if (
    !validCoordinate(latitude, -90, 90) ||
    !validCoordinate(longitude, -180, 180)
  ) {
    return null;
  }

  return normalizeLocation({
    latitude,
    longitude,
    name: searchParams.get("name"),
    admin1: searchParams.get("admin1"),
    country: searchParams.get("country"),
    countryCode: searchParams.get("countryCode"),
    timezone: searchParams.get("timezone"),
  });
};

export const locationToSearchParams = (location) => {
  const normalized = normalizeLocation(location);
  const params = new URLSearchParams();

  if (!normalized) return params;

  params.set("lat", String(normalized.latitude));
  params.set("lon", String(normalized.longitude));
  params.set("name", normalized.name);

  if (normalized.admin1) params.set("admin1", normalized.admin1);
  if (normalized.country) params.set("country", normalized.country);
  if (normalized.countryCode) params.set("countryCode", normalized.countryCode);
  if (normalized.timezone) params.set("timezone", normalized.timezone);

  return params;
};

export const weatherPathFor = (location) => {
  const params = locationToSearchParams(location);
  return params.toString() ? `/weather?${params.toString()}` : "/weather";
};

export const readSavedLocation = () => {
  try {
    const saved = window.localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!saved) return null;
    return normalizeLocation(JSON.parse(saved));
  } catch {
    return null;
  }
};

export const saveLocation = (location) => {
  const normalized = normalizeLocation(location);
  if (!normalized) return;

  try {
    window.localStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify(normalized),
    );
  } catch {
    // The app still works when storage is unavailable.
  }
};
