import { useCallback, useEffect, useState } from "react";
import { getWeather } from "../services/get-weather";

export const useWeather = (location) => {
  const [result, setResult] = useState({
    key: null,
    status: "idle",
    weather: null,
    error: null,
  });
  const [requestKey, setRequestKey] = useState(0);

  const latitude = location?.latitude;
  const longitude = location?.longitude;
  const key = location
    ? `${latitude},${longitude}:${requestKey}`
    : null;

  const retry = useCallback(() => {
    setRequestKey((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return undefined;
    }

    const controller = new AbortController();
    let active = true;

    getWeather({ latitude, longitude }, { signal: controller.signal })
      .then((weather) => {
        if (!active) return;
        setResult({
          key,
          status: "success",
          weather,
          error: null,
        });
      })
      .catch((error) => {
        if (!active || error?.name === "AbortError") return;
        setResult({
          key,
          status: "error",
          weather: null,
          error:
            error?.message ||
            "Something went wrong while loading the weather. Please try again.",
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [key, latitude, longitude]);

  const isCurrent = result.key === key;

  return {
    status: !location ? "idle" : isCurrent ? result.status : "loading",
    weather: isCurrent ? result.weather : null,
    error: isCurrent ? result.error : null,
    retry,
  };
};
