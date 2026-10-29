import { MapPin, Search } from "lucide-react";

const EmptyState = ({ onSearch }) => (
  <div className="rounded-[2rem] border border-line bg-surface p-8 text-center shadow-card sm:p-12">
    <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-sky-soft text-primary">
      <MapPin size={30} strokeWidth={1.8} aria-hidden="true" />
    </span>
    <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
      Choose a city to see the weather
    </h1>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
      Search for any city to see current conditions, the next 24 hours, and a
      7-day outlook.
    </p>
    <button
      type="button"
      onClick={onSearch}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-strong"
    >
      <Search size={15} strokeWidth={2.4} aria-hidden="true" />
      Search for a city
    </button>
  </div>
);

export default EmptyState;
