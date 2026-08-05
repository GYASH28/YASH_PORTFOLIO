"use client";

import { useEffect, useState } from "react";

/**
 * Returns the live Pune local time as a formatted HH:MM:SS string
 * (Asia/Kolkata), updated every second. Falls back gracefully on SSR.
 */
export function usePuneTime(): string {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    if (typeof Intl === "undefined") return;
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

/**
 * Returns a short "day-phase" availability label based on Pune hour:
 * early morning / morning / afternoon / evening / night.
 */
export function usePunePhase(): string {
  const [phase, setPhase] = useState<string>("");

  useEffect(() => {
    const hourFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => {
      const h = parseInt(hourFmt.format(new Date()), 10);
      if (h >= 5 && h < 9) setPhase("Early morning · Pune");
      else if (h >= 9 && h < 12) setPhase("Morning · Pune");
      else if (h >= 12 && h < 17) setPhase("Afternoon · Pune");
      else if (h >= 17 && h < 21) setPhase("Evening · Pune");
      else setPhase("Late night · Pune");
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return phase;
}
