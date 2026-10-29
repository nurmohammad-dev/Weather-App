import { MapPin } from "lucide-react";
import { formatClock, formatFullDate } from "../utils/format";
import {
  formatTemperature,
  formatTemperatureValue,
  temperatureUnitLabel,
} from "../utils/units";
import { getWeatherTheme } from "../utils/getTheme";
import WeatherScene from "./WeatherScene";

const WeatherCard = ({ weather, place, unit }) => {
  const theme = getWeatherTheme(weather.icon, weather.isDay);
  const today = weather.daily?.[0];
  const temperature = formatTemperatureValue(weather.temperature, unit);
  const locationDetails = [place?.admin1, place?.country]
    .filter(Boolean)
    .join(", ");
  const hasHigh = Number.isFinite(today?.max);
  const hasLow = Number.isFinite(today?.min);

  return (
    <section
      aria-labelledby="current-weather-title"
      className="relative overflow-hidden rounded-[2rem] border border-white/50 p-6 shadow-float sm:p-8"
      style={{
        background: `linear-gradient(155deg, ${theme.from} 0%, ${theme.to} 100%)`,
      }}
    >
      <span
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: theme.accent, opacity: theme.night ? 0.22 : 0.18 }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30"
        style={{
          background: `linear-gradient(to top, ${theme.chip}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="relative grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ background: theme.chip, color: theme.ink }}
            >
              Current conditions
            </span>
            {Number.isFinite(weather.feelsLike) && (
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold"
                style={{ background: theme.chip, color: theme.inkSoft }}
              >
                Feels like {formatTemperature(weather.feelsLike, unit)}
              </span>
            )}
          </div>

          <h1
            id="current-weather-title"
            className="mt-5 flex items-center gap-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-tight tracking-[-0.04em]"
            style={{ color: theme.ink }}
          >
            <MapPin
              size={21}
              strokeWidth={2.3}
              className="shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">{place?.name || "Selected location"}</span>
          </h1>
          {locationDetails && (
            <p className="mt-1 text-sm" style={{ color: theme.inkSoft }}>
              {locationDetails}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-end gap-x-5 gap-y-2">
            <div className="flex items-start gap-1">
              <span
                className="font-display text-[clamp(4.5rem,14vw,7.5rem)] font-extrabold leading-[0.8] tracking-[-0.08em] tabular-nums"
                style={{ color: theme.strong }}
              >
                {temperature ?? "—"}
              </span>
              {temperature !== null && (
                <span
                  className="mt-2 text-3xl font-bold leading-none"
                  style={{ color: theme.strong }}
                  aria-hidden="true"
                >
                  °
                </span>
              )}
            </div>
            <div className="pb-2">
              <p
                className="text-lg font-bold tracking-tight sm:text-xl"
                style={{ color: theme.ink }}
              >
                {weather.conditionLabel}
              </p>
              <p className="text-sm" style={{ color: theme.inkSoft }}>
                {weather.description}
              </p>
              {temperature !== null && (
                <p
                  className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: theme.inkSoft }}
                >
                  {temperatureUnitLabel(unit)}
                </p>
              )}
            </div>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold"
            style={{ color: theme.inkSoft }}
          >
            {(hasHigh || hasLow) && (
              <span>
                {hasHigh && `High ${formatTemperature(today.max, unit, false)}`}
                {hasHigh && hasLow && "  ·  "}
                {hasLow && `Low ${formatTemperature(today.min, unit, false)}`}
              </span>
            )}
            {weather.time && <span>{formatFullDate(weather.time)}</span>}
            {weather.time && <span>Updated {formatClock(weather.time)}</span>}
          </div>
        </div>

        <WeatherScene theme={theme} className="justify-self-center md:justify-self-end" />
      </div>
    </section>
  );
};

export default WeatherCard;
