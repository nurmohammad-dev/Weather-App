const toApiDate = (isoDateTime) => {
  if (!isoDateTime) return null;

  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/.exec(isoDateTime);
  if (!match) return null;

  return new Date(`${match[1]}T${match[2]}:${match[3]}:00Z`);
};

const toApiDay = (dateString) => {
  if (!dateString) return null;

  const match = /^(\d{4}-\d{2}-\d{2})$/.exec(dateString);
  if (!match) return null;

  return new Date(`${match[1]}T12:00:00Z`);
};

export const formatClock = (isoDateTime) => {
  const date = toApiDate(isoDateTime);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
};

export const formatHour = (isoDateTime) => {
  const date = toApiDate(isoDateTime);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export const formatFullDate = (isoDateTime) => {
  const date = toApiDate(isoDateTime);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export const formatWeekday = (dateString) => {
  const date = toApiDay(dateString);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
};

export const formatDayLabel = (dateString, index) => {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return formatWeekday(dateString);
};

export const formatDaylight = (sunrise, sunset) => {
  const start = toApiDate(sunrise);
  const end = toApiDate(sunset);
  if (!start || !end) return null;

  const totalMinutes = Math.max(
    0,
    Math.round((end.getTime() - start.getTime()) / 60000),
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const formatWindDirection = (degrees) => {
  if (!Number.isFinite(degrees)) return "—";

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
};

export const formatPressure = (hectopascals) => {
  if (!Number.isFinite(hectopascals)) return "—";
  return `${Math.round(hectopascals)} hPa`;
};

export const formatVisibility = (metres) => {
  if (!Number.isFinite(metres)) return "—";
  if (metres >= 1000) return `${(metres / 1000).toFixed(1)} km`;
  return `${Math.round(metres)} m`;
};

export const formatPrecipitation = (millimetres) => {
  if (!Number.isFinite(millimetres)) return "—";
  if (millimetres > 0 && millimetres < 0.1) return "<0.1 mm";
  return `${millimetres.toFixed(1)} mm`;
};

export const formatPercent = (value) => {
  if (!Number.isFinite(value)) return "—";
  return `${Math.round(value)}%`;
};

export const formatUvIndex = (value) => {
  if (!Number.isFinite(value)) return "—";
  return `${Math.round(value * 10) / 10}`;
};

export const getUvCategory = (value) => {
  if (!Number.isFinite(value)) return "Unavailable";
  if (value < 3) return "Low";
  if (value < 6) return "Moderate";
  if (value < 8) return "High";
  if (value < 11) return "Very high";
  return "Extreme";
};
