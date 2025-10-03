"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export function useLanguageCode() {
  const searchParams = useSearchParams();

  const languageCode = useMemo(() => {
    return searchParams?.get("lang") || "de";
  }, [searchParams]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", languageCode);
  }, [languageCode]);

  return languageCode;
}
