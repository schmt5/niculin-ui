"use client";

import { useSessionStorage } from "usehooks-ts";
import { Message } from "../types";

export function useConversation() {
  const [value, setValue] = useSessionStorage<Message[]>(
    "niculin-conversation",
    [],
  );

  return [value, setValue] as const;
}
