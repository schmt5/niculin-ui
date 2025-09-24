"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const dummyHotelData = {
  type: "complex",
  intro: "Hier sind die Zimmerkategorien und ihre Preise im Hotel Nira Alpina:",
  options: [
    {
      option_name: "Comfort  Zimmer",
      option_id: 1225,
      option_picture_link:
        "https://upload.wikimedia.org/wikipedia/commons/5/54/Wiki%2C_wiki%2C_wiki%2C_wiki_logo.jpg",
      cost: "ab 315 CHF",
      cost_unit: "pro  Zimmer/Nacht",
      option_summary:
        "Die Einstiegskategorie des Nira Alpina bietet ein erholsames Ambiente durch modernes Design und neutrale Farben. Das Zimmer hat Ausblick auf die Corvatsch Bergbahnstation.",
    },
  ],
  outro:
    "Die Preise pro Zimmer/Nacht beginnen ab CHF 315 (Comfort) bis CHF 580 (Alpine Junior Suite). Möchtest du eine dieser Zimmerkategorien oder eines der verfügbaren Packages buchen?",
};

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  // TODO: Remove this dummy data later
  const lastMessage = history[history.length - 1];
  if (lastMessage.content.includes("hotels")) {
    return {
      messages: [
        ...history,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: JSON.stringify(dummyHotelData),
        },
      ],
    };
  }

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
