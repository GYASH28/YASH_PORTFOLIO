"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "yg-opening-played";

export function useOpeningSession(): {
  played: boolean;
  markPlayed: () => void;
} {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setPlayed(true);
    } catch {
      // ignore
    }
  }, []);

  const markPlayed = () => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setPlayed(true);
  };

  return { played, markPlayed };
}
