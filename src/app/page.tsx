"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useCallback } from "react";
import { Message } from "./ui/Message";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

      sendMessage({ text: input });
      setInput("");
    },
    [input, sendMessage],
  );

  return (
    <div className="w-full h-[460px] max-w-lg mx-auto border relative">
      <div className="h-full flex flex-col bg-ni-50/75">
        <div className="w-full flex-1 overflow-y-auto">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="items-end w-full bg-white rounded-t-3xl p-2 border border-stone-300 border-b-0">
          <form className="w-full relative" onSubmit={onSubmit}>
            <textarea
              className="flex w-full pl-3 pr-12 outline-none py-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden resize-none rounded-md text-base"
              value={input}
              placeholder="Frage etwas..."
              rows={2}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button
              type="submit"
              className="bg-ni-600 inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full p-[7px] h-fit absolute bottom-1/2 translate-y-1/2 right-2 text-white"
            >
              <svg
                height="14"
                stroke-linejoin="round"
                viewBox="0 0 16 16"
                width="14"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
