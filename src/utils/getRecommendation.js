const RAINY_CONDITIONS = ["rain", "drizzle", "freezing_rain", "showers"];

const RECOMMENDATION_LIBRARY = {
  snow: {
    type: "snow",
    label: "Snow",
    text: "It is snowing outside. Wear warm layers and shoes with good grip.",
  },
  rain: {
    type: "rain",
    label: "Rain",
    text: "Rain is in the air. Keep an umbrella or raincoat with you.",
  },
  thunderstorm: {
    type: "rain",
    label: "Thunderstorm",
    text: "Thunderstorms are nearby. Stay indoors when you can and avoid open areas.",
  },
  fog: {
    type: "fog",
    label: "Fog",
    text: "Visibility is low. Drive carefully and leave extra room between vehicles.",
  },
  hot: {
    type: "hot",
    label: "Hot",
    text: "It feels hot outside. Drink water and take breaks in the shade.",
  },
  warm: {
    type: "warm",
    label: "Warm",
    text: "The weather is warm and comfortable. Light clothing should be enough.",
  },
  cold: {
    type: "cold",
    label: "Cold",
    text: "It is cold today. Keep a warm jacket or extra layer with you.",
  },
  sunny: {
    type: "sunny",
    label: "Sunny",
    text: "It is bright and sunny. A light outfit and sunscreen will help.",
  },
  cloudy: {
    type: "cloudy",
    label: "Cloudy",
    text: "The sky is overcast. A light layer is a sensible choice if you are heading out.",
  },
  pleasant: {
    type: "pleasant",
    label: "Mild Weather",
    text: "Conditions look comfortable. It is a good day to spend some time outside.",
  },
  clear_night: {
    type: "pleasant",
    label: "Clear Night",
    text: "Skies are clear tonight. Temperatures can drop after sunset, so keep a layer nearby.",
  },
  general: {
    type: "pleasant",
    label: "Weather Update",
    text: "Check the latest conditions before heading out.",
  },
};

const getBaseRecommendation = (weather) => {
  const condition = weather.condition;
  const feelsLike = weather.feelsLike;
  const isDay = weather.isDay !== false;

  if (condition === "snow") return RECOMMENDATION_LIBRARY.snow;
  if (RAINY_CONDITIONS.includes(condition)) return RECOMMENDATION_LIBRARY.rain;
  if (condition === "thunderstorm") return RECOMMENDATION_LIBRARY.thunderstorm;
  if (condition === "fog") return RECOMMENDATION_LIBRARY.fog;

  if (condition === "clear" || condition === "partly_cloudy") {
    if (!isDay) return RECOMMENDATION_LIBRARY.clear_night;
    if (Number.isFinite(feelsLike)) {
      if (feelsLike >= 35) return RECOMMENDATION_LIBRARY.hot;
      if (feelsLike >= 27) return RECOMMENDATION_LIBRARY.sunny;
      if (feelsLike <= 5) return RECOMMENDATION_LIBRARY.cold;
    }
    return RECOMMENDATION_LIBRARY.pleasant;
  }

  if (condition === "cloudy") {
    if (Number.isFinite(feelsLike) && feelsLike <= 5) {
      return RECOMMENDATION_LIBRARY.cold;
    }
    if (Number.isFinite(feelsLike) && feelsLike >= 30) {
      return RECOMMENDATION_LIBRARY.warm;
    }
    return RECOMMENDATION_LIBRARY.cloudy;
  }

  if (Number.isFinite(feelsLike)) {
    if (feelsLike >= 32) return RECOMMENDATION_LIBRARY.hot;
    if (feelsLike >= 25) return RECOMMENDATION_LIBRARY.warm;
    if (feelsLike <= 2) return RECOMMENDATION_LIBRARY.cold;
  }

  return RECOMMENDATION_LIBRARY.general;
};

const getExtraTip = (weather) => {
  if (Number.isFinite(weather.uvIndex) && weather.uvIndex >= 6) {
    return "UV levels are high, so sunscreen and shade are worth planning for.";
  }

  if (Number.isFinite(weather.windGusts) && weather.windGusts >= 40) {
    return "Gusts are strong, so secure loose items and expect a breezier walk.";
  }

  if (Number.isFinite(weather.visibility) && weather.visibility < 1000) {
    return "Visibility is reduced, so allow extra time if you are travelling.";
  }

  return "";
};

export const getRecommendations = (weather) => {
  if (!weather) return null;

  const base = getBaseRecommendation(weather);
  const extraTip = getExtraTip(weather);

  return {
    ...base,
    text: extraTip ? `${base.text} ${extraTip}` : base.text,
  };
};
