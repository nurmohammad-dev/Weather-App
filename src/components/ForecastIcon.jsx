import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";

const ICONS = {
  clear: Sun,
  clear_night: Moon,
  partly_cloudy: CloudSun,
  partly_cloudy_night: CloudMoon,
  cloudy: Cloud,
  fog: CloudFog,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  snow: CloudSnow,
  storm: CloudLightning,
  unknown: Cloud,
};

const ForecastIcon = ({ icon, isDay = true, size = 22, className = "" }) => {
  const key =
    icon === "clear" && !isDay
      ? "clear_night"
      : icon === "partly_cloudy" && !isDay
        ? "partly_cloudy_night"
        : icon;

  const Icon = ICONS[key] || ICONS.unknown;

  return (
    <Icon
      size={size}
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    />
  );
};

export default ForecastIcon;
