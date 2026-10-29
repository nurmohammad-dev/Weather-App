const WMO_CODES = {
  // 0-3: clear sky through to fully overcast
  0: {
    condition: "clear",
    description: "Clear sky",
    label: "Clear Sky",
    icon: "clear",
  },
  1: {
    condition: "partly_cloudy",
    description: "Mainly clear",
    label: "Partly Cloudy",
    icon: "partly_cloudy",
  },
  2: {
    condition: "partly_cloudy",
    description: "Partly cloudy",
    label: "Partly Cloudy",
    icon: "partly_cloudy",
  },
  3: {
    condition: "cloudy",
    description: "Overcast",
    label: "Cloudy",
    icon: "cloudy",
  },

  // 45-48: fog
  45: {
    condition: "fog",
    description: "Fog",
    label: "Foggy",
    icon: "fog",
  },
  48: {
    condition: "fog",
    description: "Depositing rime fog",
    label: "Foggy",
    icon: "fog",
  },

  // 51-57: drizzle and freezing drizzle
  51: {
    condition: "drizzle",
    description: "Light drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  53: {
    condition: "drizzle",
    description: "Moderate drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  55: {
    condition: "drizzle",
    description: "Dense drizzle",
    label: "Drizzle",
    icon: "rain",
  },
  56: {
    condition: "freezing_rain",
    description: "Light freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },
  57: {
    condition: "freezing_rain",
    description: "Dense freezing drizzle",
    label: "Freezing Rain",
    icon: "rain",
  },

  // 61-67: rain and freezing rain
  61: {
    condition: "rain",
    description: "Slight rain",
    label: "Rain",
    icon: "rain",
  },
  63: {
    condition: "rain",
    description: "Moderate rain",
    label: "Rain",
    icon: "rain",
  },
  65: {
    condition: "rain",
    description: "Heavy rain",
    label: "Rain",
    icon: "rain",
  },
  66: {
    condition: "freezing_rain",
    description: "Light freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },
  67: {
    condition: "freezing_rain",
    description: "Heavy freezing rain",
    label: "Freezing Rain",
    icon: "rain",
  },

  // 71-77: snowfall
  71: {
    condition: "snow",
    description: "Slight snow fall",
    label: "Snow",
    icon: "snow",
  },
  73: {
    condition: "snow",
    description: "Moderate snow fall",
    label: "Snow",
    icon: "snow",
  },
  75: {
    condition: "snow",
    description: "Heavy snow fall",
    label: "Snow",
    icon: "snow",
  },
  77: {
    condition: "snow",
    description: "Snow grains",
    label: "Snow",
    icon: "snow",
  },

  // 80-86: showers
  80: {
    condition: "showers",
    description: "Slight rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  81: {
    condition: "showers",
    description: "Moderate rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  82: {
    condition: "showers",
    description: "Violent rain showers",
    label: "Rain Showers",
    icon: "rain",
  },
  85: {
    condition: "snow",
    description: "Slight snow showers",
    label: "Snow",
    icon: "snow",
  },
  86: {
    condition: "snow",
    description: "Heavy snow showers",
    label: "Snow",
    icon: "snow",
  },

  // 95-99: thunderstorms
  95: {
    condition: "thunderstorm",
    description: "Thunderstorm",
    label: "Thunderstorm",
    icon: "storm",
  },
  96: {
    condition: "thunderstorm",
    description: "Thunderstorm with slight hail",
    label: "Thunderstorm",
    icon: "storm",
  },
  99: {
    condition: "thunderstorm",
    description: "Thunderstorm with heavy hail",
    label: "Thunderstorm",
    icon: "storm",
  },
};

export const UNKNOWN_WEATHER = {
  condition: "unknown",
  description: "Conditions unavailable",
  label: "Weather Unavailable",
  icon: "cloudy",
};

export const getWeatherCode = (code) => WMO_CODES[code] || UNKNOWN_WEATHER;
