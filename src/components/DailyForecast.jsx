import { Droplets } from "lucide-react";
import { formatDayLabel, formatPercent } from "../utils/format";
import { formatTemperature } from "../utils/units";
import ForecastIcon from "./ForecastIcon";

const DailyForecast = ({ days, unit }) => {
  if (!days?.length) return null;

  const temperatures = days.flatMap((day) =>
    [day.min, day.max].filter(Number.isFinite),
  );
  const globalMin = temperatures.length ? Math.min(...temperatures) : 0;
  const globalMax = temperatures.length ? Math.max(...temperatures) : 1;
  const range = globalMax - globalMin || 1;

  return (
    <section
      aria-labelledby="daily-heading"
      className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-card sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="daily-heading"
            className="text-xl font-extrabold tracking-tight text-ink"
          >
            7-day outlook
          </h2>
          <p className="mt-0.5 text-xs text-ink-soft">
            High and low temperatures in {unit === "fahrenheit" ? "°F" : "°C"}
          </p>
        </div>
      </div>

      <ul className="mt-3">
        {days.map((day, index) => {
          const label = formatDayLabel(day.date, index);
          const hasRange = Number.isFinite(day.min) && Number.isFinite(day.max);
          const left = hasRange
            ? Math.max(0, Math.min(100, ((day.min - globalMin) / range) * 100))
            : 0;
          const width = hasRange
            ? Math.max(8, Math.min(100, ((day.max - day.min) / range) * 100))
            : 0;

          return (
            <li
              key={day.date}
              className="grid grid-cols-[4.25rem_2rem_minmax(0,1fr)_auto] items-center gap-3 border-t border-line py-3.5 first:border-t-0"
              aria-label={`${label}: ${day.conditionLabel}, high ${formatTemperature(
                day.max,
                unit,
              )}, low ${formatTemperature(day.min, unit)}, ${formatPercent(
                day.precipitationProbability,
              )} chance of precipitation`}
            >
              <span className="truncate text-sm font-semibold text-ink">
                {label}
              </span>

              <ForecastIcon
                icon={day.icon}
                size={20}
                className="text-ink"
              />

              <div className="min-w-0">
                {hasRange && (
                  <div
                    className="relative h-2 rounded-full bg-slate-100"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute inset-y-0 rounded-full bg-primary/65"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                )}
                <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-ink-soft">
                  <Droplets size={10} aria-hidden="true" />
                  {formatPercent(day.precipitationProbability)}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 text-sm tabular-nums">
                <span className="font-extrabold text-ink">
                  {formatTemperature(day.max, unit, false)}
                </span>
                <span className="w-9 text-right font-semibold text-ink-soft">
                  {formatTemperature(day.min, unit, false)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DailyForecast;
