import { Cloud, MapPin, RefreshCw } from "lucide-react";

const ErrorState = ({ message, onRetry, onChangeLocation }) => (
  <div
    role="alert"
    className="rounded-[2rem] border border-line bg-surface p-8 text-center shadow-card sm:p-12"
  >
    <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-sky-soft text-primary">
      <Cloud size={30} strokeWidth={1.8} aria-hidden="true" />
    </span>
    <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
      Weather unavailable
    </h1>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
      {message ||
        "We could not load the weather right now. Check your connection and try again."}
    </p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-strong"
      >
        <RefreshCw size={15} strokeWidth={2.4} aria-hidden="true" />
        Try again
      </button>
      {onChangeLocation && (
        <button
          type="button"
          onClick={onChangeLocation}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-slate-50"
        >
          <MapPin size={15} strokeWidth={2.4} aria-hidden="true" />
          Change location
        </button>
      )}
    </div>
  </div>
);

export default ErrorState;
