import { lazy, Suspense } from "react";

const WeatherLottie = lazy(() => import("./WeatherLottie"));

const WeatherScene = ({ theme, className = "" }) => (
  <div
    className={`relative flex h-36 w-36 items-center justify-center sm:h-56 sm:w-56 ${className}`}
    aria-hidden="true"
  >
    <span
      className="absolute inset-4 rounded-full blur-3xl"
      style={{ background: theme.accent, opacity: theme.night ? 0.3 : 0.2 }}
    />
    <span
      className="absolute bottom-4 h-px w-36"
      style={{ background: theme.inkSoft, opacity: 0.28 }}
    />
    <Suspense fallback={<span className="block h-32 w-32 sm:h-52 sm:w-52" />}>
      <WeatherLottie
        kind="weather"
        name={theme.animation}
        className="relative h-32 w-32 sm:h-52 sm:w-52"
      />
    </Suspense>
  </div>
);

export default WeatherScene;
