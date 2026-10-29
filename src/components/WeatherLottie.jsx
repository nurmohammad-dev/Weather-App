import { LottieLight } from "lottie-react";
import { useEffect, useState } from "react";

const SAFE_NAME = /^[a-z0-9_]+$/;

const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
};

const WeatherLottie = ({ kind = "weather", name, className = "" }) => {
  const reducedMotion = usePrefersReducedMotion();
  const safeKind = SAFE_NAME.test(kind) ? kind : "weather";
  const fallback = safeKind === "advice" ? "pleasant" : "cloudy";
  const safeName = SAFE_NAME.test(name || "") ? name : fallback;

  return (
    <LottieLight
      key={safeName}
      src={`/animations/${safeKind}/${safeName}.json`}
      className={className || "h-full w-full"}
      autoplay={!reducedMotion}
      loop={!reducedMotion}
      aria-hidden="true"
    />
  );
};

export default WeatherLottie;
