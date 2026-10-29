import {
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Navigation,
  Sun,
  Umbrella,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import AppHeader from "../components/AppHeader";
import DailyForecast from "../components/DailyForecast";
import DashboardSkeleton from "../components/DashboardSkeleton";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import HourlyForecast from "../components/HourlyForecast";
import LocationModal from "../components/LocationModal";
import MetricCard from "../components/MetricCard";
import RecommendationCard from "../components/RecommendationCard";
import SunTimes from "../components/SunTimes";
import WeatherCard from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";
import {
  formatPercent,
  formatPrecipitation,
  formatPressure,
  formatUvIndex,
  formatVisibility,
  formatWindDirection,
  getUvCategory,
} from "../utils/format";
import { getRecommendations } from "../utils/getRecommendation";
import { getWeatherTheme } from "../utils/getTheme";
import {
  locationFromSearchParams,
  locationToSearchParams,
  readSavedLocation,
  saveLocation,
} from "../utils/location";
import {
  formatWind,
  readUnitPreference,
  saveUnitPreference,
} from "../utils/units";

const Weather = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [unit, setUnit] = useState(readUnitPreference);
  const [locationOpen, setLocationOpen] = useState(false);

  const urlLocation = useMemo(
    () => locationFromSearchParams(searchParams),
    [searchParams],
  );
  const savedLocation = useMemo(() => readSavedLocation(), []);
  const location = urlLocation || savedLocation;

  const { status, weather, error, retry } = useWeather(location);
  const recommendation = useMemo(
    () => getRecommendations(weather),
    [weather],
  );
  const theme = useMemo(
    () => (weather ? getWeatherTheme(weather.icon, weather.isDay) : null),
    [weather],
  );

  useEffect(() => {
    if (!urlLocation && savedLocation) {
      setSearchParams(locationToSearchParams(savedLocation), {
        replace: true,
      });
    }
  }, [urlLocation, savedLocation, setSearchParams]);

  useEffect(() => {
    if (location) saveLocation(location);
  }, [location]);

  useEffect(() => {
    saveUnitPreference(unit);
  }, [unit]);

  useEffect(() => {
    document.title = location?.name
      ? `${location.name} — Weather App`
      : "Weather App — Local Forecast";
  }, [location?.name]);

  const handleLocationSelect = (nextLocation) => {
    saveLocation(nextLocation);
    setLocationOpen(false);
    setSearchParams(locationToSearchParams(nextLocation));
  };

  const isLoading = Boolean(location) && (status === "idle" || status === "loading");
  const hasWeather = status === "success" && Boolean(weather);

  const metrics = weather
    ? [
        {
          icon: Droplets,
          label: "Humidity",
          value: formatPercent(weather.humidity),
          hint: "Relative humidity",
        },
        {
          icon: Wind,
          label: "Wind",
          value: formatWind(weather.windSpeed, unit),
          hint: Number.isFinite(weather.windDirection)
            ? `From ${formatWindDirection(weather.windDirection)}`
            : "Current wind",
        },
        {
          icon: Navigation,
          label: "Gusts",
          value: formatWind(weather.windGusts, unit),
          hint: "Peak gusts",
        },
        {
          icon: Gauge,
          label: "Pressure",
          value: formatPressure(weather.pressure),
          hint: "Sea level",
        },
        {
          icon: Eye,
          label: "Visibility",
          value: formatVisibility(weather.visibility),
          hint: "Current",
        },
        {
          icon: Sun,
          label: "UV index",
          value: formatUvIndex(weather.uvIndex),
          hint: getUvCategory(weather.uvIndex),
        },
        {
          icon: Umbrella,
          label: "Precipitation",
          value: formatPrecipitation(weather.precipitation),
          hint: "Current",
        },
        {
          icon: Cloud,
          label: "Cloud cover",
          value: formatPercent(weather.cloudCover),
          hint: "Sky cover",
        },
      ].filter((metric) => metric.value !== "—")
    : [];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
        style={{
          background: `radial-gradient(55% 100% at 50% 0%, ${
            theme?.glow || "rgba(47, 125, 246, 0.1)"
          } 0%, rgba(246, 247, 249, 0) 72%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppHeader
          locationName={location?.name}
          onChangeLocation={() => setLocationOpen(true)}
          unit={unit}
          onUnitChange={setUnit}
          showUnitToggle
        />

        <main id="main" className="pb-6 pt-4">
          {!location && (
            <EmptyState onSearch={() => setLocationOpen(true)} />
          )}

          {isLoading && <DashboardSkeleton />}

          {location && status === "error" && (
            <ErrorState
              message={error}
              onRetry={retry}
              onChangeLocation={() => setLocationOpen(true)}
            />
          )}

          {hasWeather && (
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="animate-rise lg:col-span-7">
                  <WeatherCard
                    weather={weather}
                    place={location}
                    unit={unit}
                  />
                </div>

                <div className="space-y-6 lg:col-span-5">
                  <RecommendationCard recommendation={recommendation} />
                  <SunTimes day={weather.daily?.[0]} />
                </div>
              </div>

              {metrics.length > 0 && (
                <section aria-labelledby="details-heading">
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <h2
                        id="details-heading"
                        className="text-xl font-extrabold tracking-tight text-ink"
                      >
                        Today’s details
                      </h2>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        Conditions reported for this location
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {metrics.map((metric) => (
                      <MetricCard key={metric.label} {...metric} />
                    ))}
                  </div>
                </section>
              )}

              <HourlyForecast hours={weather.hourly} unit={unit} />
              <DailyForecast days={weather.daily} unit={unit} />
            </div>
          )}
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

export default Weather;
