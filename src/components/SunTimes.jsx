import { Sun, Sunrise, Sunset } from "lucide-react";
import { formatClock, formatDaylight } from "../utils/format";

const SunTimes = ({ day }) => {
  if (!day?.sunrise && !day?.sunset) return null;

  const daylight = formatDaylight(day.sunrise, day.sunset);

  return (
    <section
      aria-labelledby="sun-heading"
      className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-card"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="sun-heading"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft"
        >
          Sun
        </h2>
        <Sun size={18} strokeWidth={2} className="text-amber-500" aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-ink-soft">
            <Sunrise size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Sunrise
            </span>
          </div>
          <p className="mt-1.5 text-sm font-bold text-ink tabular-nums">
            {formatClock(day.sunrise)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-ink-soft">
            <Sunset size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Sunset
            </span>
          </div>
          <p className="mt-1.5 text-sm font-bold text-ink tabular-nums">
            {formatClock(day.sunset)}
          </p>
        </div>
      </div>

      {daylight && (
        <p className="mt-3 text-xs text-ink-soft">Daylight today: {daylight}</p>
      )}
    </section>
  );
};

export default SunTimes;
