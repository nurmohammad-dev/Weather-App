import { lazy, Suspense } from "react";

const WeatherLottie = lazy(() => import("./WeatherLottie"));

const RECOMMENDATION_COLORS = {
  hot: "#9a3412",
  warm: "#92400e",
  cold: "#075985",
  sunny: "#92400e",
  rain: "#1e40af",
  snow: "#0e7490",
  fog: "#475569",
  cloudy: "#475569",
  pleasant: "#166534",
};

const RecommendationCard = ({ recommendation }) => {
  if (!recommendation) return null;

  const color =
    RECOMMENDATION_COLORS[recommendation.type] ||
    RECOMMENDATION_COLORS.pleasant;

  return (
    <section
      aria-labelledby="advice-heading"
      className="animate-rise rounded-[1.75rem] border border-line border-l-4 bg-surface p-5 shadow-card"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-slate-50 ring-1 ring-line">
          <Suspense fallback={<span className="block h-10 w-10" />}>
            <WeatherLottie
              kind="advice"
              name={recommendation.type}
              className="h-10 w-10"
            />
          </Suspense>
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
              style={{ backgroundColor: color }}
            >
              {recommendation.label}
            </span>
            <h2
              id="advice-heading"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft"
            >
              Plan your day
            </h2>
          </div>
          <p className="mt-2 text-[15px] font-semibold leading-6 text-ink">
            {recommendation.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecommendationCard;
