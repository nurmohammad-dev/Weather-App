export const CELSIUS = "celsius";
export const FAHRENHEIT = "fahrenheit";

const UNIT_STORAGE_KEY = "weather-app:unit";

export const readUnitPreference = () => {
  try {
    const saved = window.localStorage.getItem(UNIT_STORAGE_KEY);
    return saved === FAHRENHEIT ? FAHRENHEIT : CELSIUS;
  } catch {
    return CELSIUS;
  }
};

export const saveUnitPreference = (unit) => {
  try {
    window.localStorage.setItem(
      UNIT_STORAGE_KEY,
      unit === FAHRENHEIT ? FAHRENHEIT : CELSIUS,
    );
  } catch {
    // The app still works when storage is unavailable.
  }
};

export const temperatureUnitLabel = (unit) =>
  unit === FAHRENHEIT ? "°F" : "°C";

export const windUnitLabel = (unit) =>
  unit === FAHRENHEIT ? "mph" : "km/h";

export const convertTemperature = (celsius, unit) => {
  if (!Number.isFinite(celsius)) return null;
  return unit === FAHRENHEIT ? (celsius * 9) / 5 + 32 : celsius;
};

export const formatTemperatureValue = (celsius, unit) => {
  const value = convertTemperature(celsius, unit);
  return value === null ? null : Math.round(value);
};

export const formatTemperature = (celsius, unit, includeUnit = true) => {
  const value = formatTemperatureValue(celsius, unit);
  if (value === null) return "—";
  return includeUnit ? `${value}${temperatureUnitLabel(unit)}` : `${value}°`;
};

export const convertWind = (kilometresPerHour, unit) => {
  if (!Number.isFinite(kilometresPerHour)) return null;
  return unit === FAHRENHEIT
    ? kilometresPerHour * 0.621371
    : kilometresPerHour;
};

export const formatWind = (kilometresPerHour, unit) => {
  const value = convertWind(kilometresPerHour, unit);
  if (value === null) return "—";
  return `${Math.round(value)} ${windUnitLabel(unit)}`;
};
