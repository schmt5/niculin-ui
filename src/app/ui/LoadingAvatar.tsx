import { memo, useEffect } from "react";
import { Avatar } from "./Avatar";

interface LoadingAvatarProps {
  onMount: () => void;
}

function LoadingAvatarComponent({ onMount }: LoadingAvatarProps) {
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
