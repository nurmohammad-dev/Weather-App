import {
  ChevronRight,
  Loader2,
  LocateFixed,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchLocations } from "../services/get-geolocation";

const GEOLOCATION_ERRORS = {
  1: "Location permission was denied. You can still search for a city.",
  2: "Your location could not be determined. Please search for a city.",
  3: "The location request timed out. Please try again or search for a city.",
};

const LocationModal = ({ onDismiss, onSelect }) => {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const searchController = useRef(null);
  const mountedRef = useRef(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    previousFocusRef.current = document.activeElement;
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }

    return () => {
      mountedRef.current = false;
      searchController.current?.abort();

      if (dialog?.open) dialog.close();
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    searchController.current?.abort();

    const value = query.trim();
    if (!value) {
      setError("Enter a city name to search.");
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    searchController.current = controller;

    setStatus("loading");
    setError("");
    setResults([]);
    setSearchedQuery(value);

    try {
      const found = await searchLocations(value, {
        signal: controller.signal,
      });

      if (controller.signal.aborted || !mountedRef.current) return;

      setResults(found);
      setStatus("success");
    } catch (searchError) {
      if (searchError?.name === "AbortError" || !mountedRef.current) return;

      setError(
        searchError?.message ||
          "Something went wrong while searching for that city. Please try again.",
      );
      setStatus("error");
    }
  };

  const handleSelect = (location) => {
    searchController.current?.abort();
    onSelect(location);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setGeoLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mountedRef.current) return;
        setGeoLoading(false);

        onSelect({
          name: "Current location",
          admin1: "",
          country: "",
          countryCode: "",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: "",
        });
      },
      (geoError) => {
        if (!mountedRef.current) return;
        setGeoLoading(false);

        setError(
          GEOLOCATION_ERRORS[geoError.code] ||
            "We could not get your location. Please search for a city instead.",
        );
      },
      {
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="location-dialog-title"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
      onClose={onDismiss}
      className="m-auto w-[min(30rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-[1.75rem] border border-line bg-surface p-0 text-ink shadow-float"
    >
      <div className="flex max-h-[min(85dvh,44rem)] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <h2
              id="location-dialog-title"
              className="font-display text-xl font-extrabold tracking-tight text-ink"
            >
              Where are you today?
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Search for a city or use your current location.
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close location dialog"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-line text-ink-soft transition-colors hover:bg-slate-50 hover:text-ink"
          >
            <X size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          <form onSubmit={handleSubmit} role="search" className="space-y-3">
            <label
              htmlFor="city-search"
              className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft"
            >
              City
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                id="city-search"
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. London, Tokyo, New York"
                autoFocus
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-500 focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Search for a city"
                aria-busy={status === "loading"}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-strong"
              >
                {status === "loading" ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Search size={15} strokeWidth={2.4} aria-hidden="true" />
                )}
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-danger"
            >
              {error}
            </p>
          )}

          <div className="my-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={handleUseLocation}
            disabled={geoLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {geoLoading ? (
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            ) : (
              <LocateFixed size={15} strokeWidth={2.4} aria-hidden="true" />
            )}
            {geoLoading ? "Finding your location…" : "Use my location"}
          </button>

          <div
            aria-live="polite"
            aria-busy={status === "loading"}
            className="mt-4"
          >
            {status === "loading" && (
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Loader2
                  size={14}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Searching for cities…
              </p>
            )}

            {status === "success" && results.length === 0 && (
              <div className="rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-ink-soft">
                <p className="font-semibold text-ink">
                  No places found for “{searchedQuery}”
                </p>
                <p className="mt-1">
                  Check the spelling or try a nearby city or region.
                </p>
              </div>
            )}

            {status === "success" && results.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  Matching locations
                </p>
                <ul aria-label="Matching locations" className="mt-2 space-y-1">
                  {results.map((result) => (
                    <li key={`${result.latitude},${result.longitude}`}>
                      <button
                        type="button"
                        onClick={() => handleSelect(result)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-line hover:bg-slate-50"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-soft text-primary">
                          <MapPin
                            size={16}
                            strokeWidth={2.3}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-ink">
                            {result.name}
                          </span>
                          <span className="block truncate text-xs text-ink-soft">
                            {[result.admin1, result.country]
                              .filter(Boolean)
                              .join(", ") || "Selected location"}
                          </span>
                        </span>
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default LocationModal;
