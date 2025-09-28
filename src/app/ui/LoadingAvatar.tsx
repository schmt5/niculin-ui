import { memo, useEffect } from "react";
import { Avatar } from "./Avatar";

interface LoadingAvatarProps {
  onMount: () => void;
}

function LoadingAvatarComponent({ onMount }: LoadingAvatarProps) {
  const spinnerMessages = [
    "🧠 Searching for best topic...",
    "⌛ Best topic found...",
    "📚 Searching memory...",
    "🚫📁 Nothing found...",
    "🌐🔍 Searching internet...",
    "✍️ Results obtained from the internet...",
    "✍️ Analysing internet results...",
    "✍️🤔 Integrating results in answer...",
  ];

  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <div className="flex gap-2 items-baseline m-6">
      <Avatar />
      <span className="text-stone-500 text-sm italic">Denkt nach...</span>
    </div>
  );
}

export const LoadingAvatar = memo(LoadingAvatarComponent);
