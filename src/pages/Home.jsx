import {
  CalendarDays,
  Clock,
  Gauge,
  Search,
} from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import AppHeader from "../components/AppHeader";
import LocationModal from "../components/LocationModal";
import { readSavedLocation, saveLocation, weatherPathFor } from "../utils/location";

const WeatherLottie = lazy(() => import("../components/WeatherLottie"));

const FEATURES = [
  {
    icon: Gauge,
    title: "Live conditions",
    text: "Temperature, feels-like, wind, humidity, UV, and more.",
  },
  {
    icon: Clock,
    title: "Next 24 hours",
    text: "A clear hourly view with rain chances.",
  },
  {
    icon: CalendarDays,
    title: "7-day outlook",
    text: "Daily highs, lows, and conditions at a glance.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [locationOpen, setLocationOpen] = useState(false);
  const savedLocation = useMemo(() => readSavedLocation(), []);

  const handleLocationSelect = (location) => {
    saveLocation(location);
    setLocationOpen(false);
    navigate(weatherPathFor(location));
  };

  const openSavedLocation = () => {
    if (!savedLocation) return;
    saveLocation(savedLocation);
    navigate(weatherPathFor(savedLocation));
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-80"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(47, 125, 246, 0.13) 0%, rgba(246, 247, 249, 0) 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppHeader
          onChangeLocation={() => setLocationOpen(true)}
          showUnitToggle={false}
        />

        <main
          id="main"
          className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16"
        >
          <div className="animate-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Weather App · Local forecast
            </p>
            <h1 className="mt-4 max-w-xl font-display text-[clamp(2.75rem,7vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.06em] text-ink text-balance">
              Weather, without the noise.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-ink-soft sm:text-lg">
              Search any city for current conditions, the next 24 hours, and a
              clear 7-day outlook — all in one calm place.
            </p>

            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="group mt-8 flex w-full max-w-lg items-center gap-3 rounded-2xl border border-line bg-surface px-3.5 py-3.5 text-left shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-float"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-primary">
                <Search size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">
                  Search for a city
                </span>
                <span className="block text-xs text-ink-soft">
                  London, Tokyo, New York…
                </span>
              </span>
              <span className="hidden rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white transition-colors group-hover:bg-primary-strong sm:inline">
                Search
              </span>
            </button>

            {savedLocation && (
              <button
                type="button"
                onClick={openSavedLocation}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-slate-300 hover:text-ink"
              >
                <Clock size={13} strokeWidth={2.2} aria-hidden="true" />
                Last viewed:{" "}
                <span className="font-bold text-ink">{savedLocation.name}</span>
              </button>
            )}

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-line bg-surface/80 p-4 shadow-card"
                >
                  <Icon
                    size={17}
                    strokeWidth={2.1}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="mt-2.5 text-sm font-extrabold text-ink">
                    {title}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div
              className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/70 shadow-float"
              style={{
                background:
                  "linear-gradient(155deg, #eff7ff 0%, #cfe4ff 58%, #b9d8ff 100%)",
              }}
            >
              <span
                className="absolute -right-16 -top-20 size-56 rounded-full bg-amber-300/40 blur-3xl"
                aria-hidden="true"
              />
              <span
                className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col items-center justify-center p-8">
                <p className="self-start text-[10px] font-bold uppercase tracking-[0.18em] text-sky-950/70">
                  A clearer forecast
                </p>
                <Suspense fallback={<span className="mt-2 block h-72 w-72" />}>
                  <WeatherLottie
                    kind="weather"
                    name="partly_cloudy"
                    className="mt-2 h-72 w-72"
                  />
                </Suspense>
                <div className="mt-auto w-full rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-950/70">
                    Built for the everyday
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-sky-950">
                    Conditions, hourly changes, and the week ahead without
                    visual clutter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {locationOpen && (
        <LocationModal
          onDismiss={() => setLocationOpen(false)}
          onSelect={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default Home;
