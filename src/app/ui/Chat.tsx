"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { continueConversation } from "../actions";
import { MessageItem } from "./MessageItem";
import { SubmitButton } from "./SubmitButton";
import { LoadingAvatar } from "./LoadingAvatar";
import { useConversation } from "../hooks/useConversation";
import { useInitSession } from "../hooks/useInitSession";
import { getDateTime } from "../utils/getDateTime";
import { useSearchParams } from "next/navigation";
import { useLanguageCode } from "../hooks/useLanguageCode";
import { Avatar } from "./Avatar";

export function Chat() {
  const searchParams = useSearchParams();
  const version = searchParams?.get("version") || "v1";
  const languageCode = useLanguageCode();

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
    <div className="h-full flex flex-col bg-white rounded-2xl">
      <div className="w-full flex-1 overflow-y-auto">
        <div className="flex flex-col items-center text-gray-800 my-8 mx-12">
          <div className="w-full flex justify-center items-center gap-4 p-4 rounded-3xl bg-blue-300/90">
            <Avatar />
            <span className="text-2xl xs:text-4xl font-semibold">
              Assistant NICULIN
            </span>
          </div>
        </div>
        {conversation.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {loading && (
          <LoadingAvatar onMount={scrollToBottom} lastMessage={input} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="items-end w-full pt-2">
        <div className="bg-gray-100 border border-gray-200 rounded-full pl-2 pr-1 py-1 mx-4">
          <form className="w-full relative" onSubmit={onSubmit}>
            <textarea
              id="message-input"
              readOnly={loading}
              className="flex w-full pl-3 pr-12 outline-none py-2 read-only:opacity-50 overflow-hidden resize-none rounded-md text-base"
              value={input}
              placeholder="Schreibe eine Nachricht..."
              rows={1}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={onKeyDown}
            />

            <SubmitButton loading={loading} disabled={input.length === 0} />
          </form>
        </div>
        <div className="border-t border-gray-200 mt-4 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-400 font-semibold">
            Niculin kann Fehler machen
          </span>
          <a
            href="https://alpinesphere.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 font-semibold"
          >
            Powered by alplnesphere.ch
          </a>
        </div>
      </div>
    </div>
  );
}
