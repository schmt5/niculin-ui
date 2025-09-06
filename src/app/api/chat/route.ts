import { openai } from "@ai-sdk/openai";
import { generateText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log(messages[0].parts);

  const userPrompt = messages
    .at(-1)
    ?.parts?.map((part) => part.text)
    .join(" ");
  console.log(userPrompt);

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: "hi my name is tiri",
  });

  console.log(text);

  const newMessages = [
    ...messages,
    { id: crypto.randomUUID(), role: "assistant", content: text },
  ];

  return Response.json({ message: newMessages });
}
