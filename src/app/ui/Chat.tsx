"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { continueConversation } from "../actions";
import { MessageItem } from "./MessageItem";
import { SubmitButton } from "./SubmitButton";
import { LoadingAvatar } from "./LoadingAvatar";
import { useConversation } from "../hooks/useConversation";
import { useInitSession } from "../hooks/useInitSession";
import { parseApiResponse, dummyResponse } from "../utils/parseApiResponse";

export function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [conversation, setConversation] = useConversation();
  const [sessionId] = useInitSession();
  const sessionIdString =
    typeof sessionId === "string" ? `${sessionId.substring(0, 5)}, ` : "";

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const { messages } = await continueConversation([
        ...conversation,
        { id: Date.now().toString(), content: input, role: "user" as const },
      ]);

      setInput("");
      setConversation(messages);
      setLoading(false);
    },
    [input, conversation, setConversation],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.trim() && !loading) {
          const form = e.currentTarget.form;
          if (form) {
            form.requestSubmit();
          }
        }
      }
    },
    [input, loading],
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="h-full flex flex-col bg-ni-50/75">
      <div className="w-full flex-1 overflow-y-auto">
        {conversation.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {loading && <LoadingAvatar onMount={scrollToBottom} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="items-end w-full bg-white px-2 pt-4 border border-stone-300 border-b-0 rounded-t-3xl">
        <form className="w-full relative" onSubmit={onSubmit}>
          <textarea
            id="message-input"
            readOnly={loading}
            className="flex w-full pl-3 pr-12 outline-none py-2 read-only:opacity-50 overflow-hidden resize-none rounded-md text-base"
            value={input}
            placeholder="Frage etwas..."
            rows={1}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyDown={onKeyDown}
          />

          <SubmitButton loading={loading} />
        </form>
        <span className="inline-block w-full text-end px-2 pb-1 text-xs italic text-stone-500">
          <span>{sessionIdString}</span>
          <span>Niculin kann Fehler machen</span>
        </span>
      </div>
    </div>
  );
}
