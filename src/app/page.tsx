"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { continueConversation, Message } from "./actions";
import { MessageItem } from "./ui/MessageItem";
import { SubmitButton } from "./ui/SubmitButton";
import { Avatar } from "./ui/Avatar";
import { LoadingAvatar } from "./ui/LoadingAvatar";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    [input, conversation],
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
    <div className="w-full h-[460px] max-w-lg mx-auto border relative">
      <div className="h-full flex flex-col bg-ni-50/75">
        <div className="w-full flex-1 overflow-y-auto">
          {conversation.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}

          {loading && <LoadingAvatar onMount={scrollToBottom} />}
          <div ref={messagesEndRef} />
        </div>

        <div className="items-end w-full bg-white rounded-t-3xl p-2 border border-stone-300 border-b-0">
          <form className="w-full relative" onSubmit={onSubmit}>
            <textarea
              id="message-input"
              readOnly={loading}
              className="flex w-full pl-3 pr-12 outline-none py-2 read-only:opacity-50 overflow-hidden resize-none rounded-md text-base"
              value={input}
              placeholder="Frage etwas..."
              rows={2}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={onKeyDown}
            />

            <SubmitButton loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}
