import { getWeatherCode } from "../utils/weatherCodes";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const CURRENT_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "precipitation",
  "weather_code",
  "cloud_cover",
  "pressure_msl",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m",
  "uv_index",
  "visibility",
].join(",");

const HOURLY_FIELDS = [
  "temperature_2m",
  "weather_code",
  "precipitation_probability",
  "is_day",
].join(",");

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "uv_index_max",
  "precipitation_probability_max",
].join(",");

const isAbortError = (error) => error?.name === "AbortError";

const numberOrNull = (value) =>
  Number.isFinite(value) ? Number(value) : null;

const weatherIcon = (code, isDay) => {
  const weather = getWeatherCode(code);
  return weather.icon === "clear" && !isDay ? "clear_night" : weather.icon;
};

const buildHourly = (hourly, currentTime) => {
  if (!hourly?.time?.length) return [];

  const currentHour = currentTime
    ? `${String(currentTime).slice(0, 13)}:00`
    : null;
  const startIndex = currentHour
    ? hourly.time.findIndex((time) => time >= currentHour)
    : 0;
  const start = startIndex >= 0 ? startIndex : 0;

  return hourly.time
    .slice(start, start + 24)
    .map((time, offset) => {
      const index = start + offset;
      const code = hourly.weather_code?.[index];
      const isDay = hourly.is_day?.[index] !== 0;
      const weather = getWeatherCode(code);

      return {
        time,
        temperature: numberOrNull(hourly.temperature_2m?.[index]),
        precipitationProbability: numberOrNull(
          hourly.precipitation_probability?.[index],
        ),
        isDay,
        code: numberOrNull(code),
        icon: weatherIcon(code, isDay),
        condition: weather.condition,
        conditionLabel: weather.label,
      };
    });
};

const buildDaily = (daily) => {
  if (!daily?.time?.length) return [];

  return daily.time.slice(0, 7).map((date, index) => {
    const code = daily.weather_code?.[index];
    const weather = getWeatherCode(code);

    return {
      date,
      code: numberOrNull(code),
      icon: weather.icon,
      condition: weather.condition,
      conditionLabel: weather.label,
      max: numberOrNull(daily.temperature_2m_max?.[index]),
      min: numberOrNull(daily.temperature_2m_min?.[index]),
      precipitationProbability: numberOrNull(
        daily.precipitation_probability_max?.[index],
      ),
      uvIndexMax: numberOrNull(daily.uv_index_max?.[index]),
      sunrise: daily.sunrise?.[index] || null,
      sunset: daily.sunset?.[index] || null,
    };
  });
};

export const getWeather = async (
  { latitude, longitude },
  { signal } = {},
) => {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("That location is not valid. Please choose another city.");
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: CURRENT_FIELDS,
    hourly: HOURLY_FIELDS,
    daily: DAILY_FIELDS,
    timezone: "auto",
    forecast_days: "7",
  });

  let response;

  try {
    response = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new Error(
      "We could not reach the weather service. Check your connection and try again.",
      { cause: error },
    );
  }

  if (!response.ok) {
    throw new Error(
      `The weather service returned an error (${response.status}). Please try again.`,
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      "We received an invalid response from the weather service. Please try again.",
      { cause: error },
    );
  }

  if (!data?.current) {
    throw new Error(
      "Weather data is unavailable for this location. Please try another city.",
    );
  }

  const now = data.current;
  const isDay = now.is_day !== 0;
  const weather = getWeatherCode(now.weather_code);
  const icon = weatherIcon(now.weather_code, isDay);

  return {
    temperature: numberOrNull(now.temperature_2m),
    feelsLike: numberOrNull(now.apparent_temperature),
    humidity: numberOrNull(now.relative_humidity_2m),
    windSpeed: numberOrNull(now.wind_speed_10m),
    windDirection: numberOrNull(now.wind_direction_10m),
    windGusts: numberOrNull(now.wind_gusts_10m),
    precipitation: numberOrNull(now.precipitation),
    cloudCover: numberOrNull(now.cloud_cover),
    pressure: numberOrNull(now.pressure_msl),
    visibility: numberOrNull(now.visibility),
    uvIndex: numberOrNull(now.uv_index),
    isDay,
    condition: weather.condition,
    description: weather.description,
    conditionLabel: weather.label,
    icon,
    time: now.time || null,
    timezone: data.timezone || "",
    hourly: buildHourly(data.hourly, now.time),
    daily: buildDaily(data.daily),
    fetchedAt: new Date().toISOString(),
  };
};
