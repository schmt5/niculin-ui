import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { useFrames } from "next/dist/next-devtools/dev-overlay/utils/get-error-by-type";
import { getRandomIndex, getRandomNumber } from "../utils/getRandomNumber";

interface LoadingAvatarProps {
  onMount: () => void;
  lastMessage: string;
}

function LoadingAvatarComponent({ onMount, lastMessage }: LoadingAvatarProps) {
  const spinnerMessages = useMemo(
    () => [
      "🧠 Searching for best topic...",
      "⌛ Best topic found...",
      "📚 Searching memory...",
      "🚫📁 Nothing found...",
      "🌐🔍 Searching internet...",
      "✍️ Results obtained from the internet...",
      "✍️ Analysing internet results...",
      "✍️🤔 Integrating results in answer...",
    ],
    [],
  );
  const initialMessagesIndex = getRandomNumber(2);
  const usedMessagesRef = useRef([initialMessagesIndex]);
  const [currentMessage, setCurrentMessage] = useState(
    spinnerMessages[initialMessagesIndex],
  );

  useEffect(() => {
    onMount();
  }, [onMount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const index = getRandomIndex(
        0,
        spinnerMessages.length - 1,
        usedMessagesRef.current,
      );
      usedMessagesRef.current.push(index);
      setCurrentMessage(spinnerMessages[index]);
    }, 1800);

    return () => clearTimeout(timer);
  }, [currentMessage, spinnerMessages]);

  return (
    <div>
      <div className="bg-ni-200 border border-stone-300 p-2 rounded-md max-w-md ml-auto mr-4 my-4">
        {lastMessage}
      </div>
      <div className="flex gap-2 items-baseline m-6">
        <Avatar />
        <span className="text-stone-500">{currentMessage}</span>
      </div>
    </div>
  );
}

export const LoadingAvatar = memo(LoadingAvatarComponent);
