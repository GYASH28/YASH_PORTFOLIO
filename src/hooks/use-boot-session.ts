"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "yg-boot-played";

/**
 * Tracks whether the SIGNAL_BOOT intro has already played this session.
 * Repeat visitors get a shorter (or skipped) intro.
 */
export function useBootSession(): {
  played: boolean;
  markPlayed: () => void;
} {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    try {
      const v = sessionStorage.getItem(SESSION_KEY);
      if (v === "1") setPlayed(true);
    } catch {
      // sessionStorage might be unavailable — treat as not played.
    }
  }, []);

  const markPlayed = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setPlayed(true);
  };

  return { played, markPlayed };
}
