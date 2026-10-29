const DAY_THEMES = {
  clear: {
    from: "#fff8ea",
    to: "#ffe3b0",
    accent: "#d97706",
    strong: "#b45309",
    ink: "#3a2a08",
    inkSoft: "rgba(58, 42, 8, 0.72)",
    chip: "rgba(255, 255, 255, 0.74)",
    glow: "rgba(217, 119, 6, 0.16)",
    animation: "clear",
  },
  partly_cloudy: {
    from: "#eff7ff",
    to: "#cfe4ff",
    accent: "#2f7df6",
    strong: "#1d4ed8",
    ink: "#102a4c",
    inkSoft: "rgba(16, 42, 76, 0.72)",
    chip: "rgba(255, 255, 255, 0.74)",
    glow: "rgba(47, 125, 246, 0.14)",
    animation: "partly_cloudy",
  },
  cloudy: {
    from: "#f6f8fb",
    to: "#dce5ef",
    accent: "#64748b",
    strong: "#475569",
    ink: "#1e293b",
    inkSoft: "rgba(30, 41, 59, 0.7)",
    chip: "rgba(255, 255, 255, 0.78)",
    glow: "rgba(100, 116, 139, 0.14)",
    animation: "cloudy",
  },
  fog: {
    from: "#f5f8fa",
    to: "#dce6ee",
    accent: "#7c8a9a",
    strong: "#64748b",
    ink: "#27364a",
    inkSoft: "rgba(39, 54, 74, 0.7)",
    chip: "rgba(255, 255, 255, 0.78)",
    glow: "rgba(124, 138, 154, 0.16)",
    animation: "fog",
  },
  rain: {
    from: "#f0f7ff",
    to: "#c9e0fa",
    accent: "#2563eb",
    strong: "#1d4ed8",
    ink: "#102a4c",
    inkSoft: "rgba(16, 42, 76, 0.72)",
    chip: "rgba(255, 255, 255, 0.74)",
    glow: "rgba(37, 99, 235, 0.16)",
    animation: "rain",
  },
  snow: {
    from: "#f4fbff",
    to: "#d5eefb",
    accent: "#0891b2",
    strong: "#0e7490",
    ink: "#123b4a",
    inkSoft: "rgba(18, 59, 74, 0.7)",
    chip: "rgba(255, 255, 255, 0.78)",
    glow: "rgba(8, 145, 178, 0.14)",
    animation: "snow",
  },
  storm: {
    from: "#f1f2ff",
    to: "#d3d8fa",
    accent: "#6d5bd0",
    strong: "#5b4bc4",
    ink: "#252456",
    inkSoft: "rgba(37, 36, 86, 0.72)",
    chip: "rgba(255, 255, 255, 0.74)",
    glow: "rgba(109, 91, 208, 0.16)",
    animation: "storm",
  },
  unknown: {
    from: "#f6f8fb",
    to: "#dce5ef",
    accent: "#64748b",
    strong: "#475569",
    ink: "#1e293b",
    inkSoft: "rgba(30, 41, 59, 0.7)",
    chip: "rgba(255, 255, 255, 0.78)",
    glow: "rgba(100, 116, 139, 0.14)",
    animation: "cloudy",
  },
};

const NIGHT_ACCENTS = {
  clear: "#fbbf24",
  partly_cloudy: "#93c5fd",
  cloudy: "#cbd5e1",
  fog: "#cbd5e1",
  rain: "#60a5fa",
  snow: "#67e8f9",
  storm: "#a5b4fc",
  unknown: "#cbd5e1",
};

const NIGHT_GLOWS = {
  clear: "rgba(251, 191, 36, 0.14)",
  partly_cloudy: "rgba(147, 197, 253, 0.14)",
  cloudy: "rgba(203, 213, 225, 0.1)",
  fog: "rgba(203, 213, 225, 0.1)",
  rain: "rgba(96, 165, 250, 0.14)",
  snow: "rgba(103, 232, 249, 0.12)",
  storm: "rgba(165, 180, 252, 0.16)",
  unknown: "rgba(203, 213, 225, 0.1)",
};

export const getWeatherTheme = (icon = "unknown", isDay = true) => {
  const key = icon === "clear_night" ? "clear" : icon;
  const base = DAY_THEMES[key] || DAY_THEMES.unknown;
  const night = !isDay || icon === "clear_night";

  if (!night) {
    return {
      ...base,
      animation: base.animation,
      night: false,
    };
  }

  return {
    from: "#0b1728",
    to: "#172a45",
    accent: NIGHT_ACCENTS[key] || NIGHT_ACCENTS.unknown,
    strong: "#f8fafc",
    ink: "#f8fafc",
    inkSoft: "rgba(248, 250, 252, 0.72)",
    chip: "rgba(255, 255, 255, 0.12)",
    glow: NIGHT_GLOWS[key] || NIGHT_GLOWS.unknown,
    animation: key === "clear" ? "clear_night" : base.animation,
    night: true,
  };
};
