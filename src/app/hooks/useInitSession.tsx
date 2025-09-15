"use client";

import { useEffect, useState } from "react";
import { initSession } from "../actions";

export function useInitSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const handleInitSession = async () => {
      try {
        const result = await initSession();
        setSessionId(result.data.sessionId);
      } catch (err) {
        console.error("Session initialization failed:", err);
      }
    };

    handleInitSession();
  }, []);

  return [sessionId] as const;
}
