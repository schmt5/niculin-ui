"use client";

import { useLocalStorage } from "usehooks-ts";

export function useClientId() {
  const [value, setValue] = useLocalStorage<string>("niculin-client-id", "");

  return [value, setValue] as const;
}
