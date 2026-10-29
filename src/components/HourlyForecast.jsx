import { Droplets } from "lucide-react";
import { formatHour, formatPercent } from "../utils/format";
import { formatTemperature } from "../utils/units";
import ForecastIcon from "./ForecastIcon";

const HourlyForecast = ({ hours, unit }) => {
  if (!hours?.length) return null;

  return (
    <section aria-labelledby="hourly-heading">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="hourly-heading"
            className="text-xl font-extrabold tracking-tight text-ink"
          >
            Next 24 hours
          </h2>
          <p className="mt-0.5 text-xs text-ink-soft">
            Local time · temperatures in {unit === "fahrenheit" ? "°F" : "°C"}
          </p>
        </div>
      </div>

      <ul
        tabIndex={0}
        aria-label="24-hour forecast, scroll horizontally for later hours"
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1"
      >
        {hours.map((hour, index) => {
          const isNow = index === 0;
          const hourLabel = isNow ? "Now" : formatHour(hour.time);
          const temperature = formatTemperature(hour.temperature, unit, false);
          const precipitation = formatPercent(hour.precipitationProbability);

          return (
            <li
              key={hour.time}
              className={`min-w-[5.25rem] snap-start rounded-2xl border p-3 text-center shadow-card ${
                isNow
                  ? "border-primary/20 bg-sky-soft"
                  : "border-line bg-surface"
              }`}
              aria-label={`${hourLabel}: ${hour.conditionLabel}, ${formatTemperature(
                hour.temperature,
                unit,
              )}, ${precipitation} chance of precipitation`}
            >
              <p
                className={`text-[11px] font-bold ${
                  isNow ? "text-primary" : "text-ink-soft"
                }`}
              >
                {hourLabel}
              </p>
              <ForecastIcon
                icon={hour.icon}
                isDay={hour.isDay}
                size={21}
                className="mx-auto mt-2 text-ink"
              />
              <p className="mt-2 text-sm font-extrabold text-ink tabular-nums">
                {temperature}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-[10px] font-semibold text-ink-soft">
                <Droplets size={10} aria-hidden="true" />
                {precipitation}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HourlyForecast;
