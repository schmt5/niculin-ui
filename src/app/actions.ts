"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: "You are a friendly assistant!",
    messages: history,
  });

  return {
    messages: [
      ...history,
      {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: text,
      },
    ],
  };
}

export async function initSession(data = {}) {
  try {
    const sessionData = {
      timestamp: new Date().toISOString(),
      sessionId: crypto.randomUUID(),
      ...data,
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error();
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (_error) {
    throw new Error("Session init failed");
  }
}
