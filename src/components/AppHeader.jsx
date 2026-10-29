import { CloudSun, MapPin, Search } from "lucide-react";
import { Link } from "react-router";
import UnitToggle from "./UnitToggle";

const AppHeader = ({
  locationName,
  onChangeLocation,
  unit,
  onUnitChange,
  showUnitToggle = false,
}) => (
  <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line/70 bg-canvas/85 py-4 backdrop-blur-xl sm:gap-3">
    <Link
      to="/"
      className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-offset-4 sm:gap-3"
      aria-label="Weather App home"
    >
      <span className="grid size-10 place-items-center rounded-2xl bg-ink text-white shadow-card transition-transform group-hover:-translate-y-0.5">
        <CloudSun size={21} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-display text-[16px] font-extrabold tracking-tight text-ink sm:text-[17px]">
          Weather App
        </span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:block">
          Local forecast
        </span>
      </span>
    </Link>

    <div className="flex items-center gap-2">
      {onChangeLocation && (
        <button
          type="button"
          onClick={onChangeLocation}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 sm:px-3"
          aria-label={
            locationName
              ? `Change location, currently ${locationName}`
              : "Search for a city"
          }
        >
          {locationName ? (
            <MapPin size={15} strokeWidth={2.3} aria-hidden="true" />
          ) : (
            <Search size={15} strokeWidth={2.3} aria-hidden="true" />
          )}
          <span className="hidden max-w-[13rem] truncate sm:inline">
            {locationName || "Search city"}
          </span>
        </button>
      )}

      {showUnitToggle && (
        <UnitToggle unit={unit} onChange={onUnitChange} />
      )}
    </div>
  </header>
);

export default AppHeader;
