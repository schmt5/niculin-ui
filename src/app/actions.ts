"use server";

import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { Message } from "./types";
import { dummyResponse } from "./utils/parseApiResponse";
import { sleep } from "./utils/sleep";

export async function continueConversation(history: Message[]) {
  "use server";

  const niculinOpenAI = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.com/v1",
    headers: {
      "X-Custom-Header": "value", // example for custom header
    },
  });

  // TODO: Remove this dummy data later
  const lastMessage = history[history.length - 1];
  if (lastMessage.content.includes("activities")) {
    await sleep(1000);

    return {
      messages: [
        ...history,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: dummyResponse,
        },
      ],
    };
  }

  try {
    const { text } = await generateText({
      model: niculinOpenAI("gpt-3.5-turbo"),
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
  } catch (error) {
    console.error(error);
    const errorMessage = "Uups, something went wrong. Please try again later!";

    return {
      messages: [
        ...history,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: errorMessage,
        },
      ],
    };
  }
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
