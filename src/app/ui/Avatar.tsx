import { memo } from "react";
import Image from "next/image";

function AvatarComponent() {
  const customAvatarSrc = process.env.NEXT_PUBLIC_AVATAR_SRC;

  if (customAvatarSrc) {
    return (
      <img
        height={48}
        width={48}
        src={customAvatarSrc}
        alt="AI Avatar"
        className="rounded-full shadow-md h-12 w-12 object-cover"
      />
    );
  }

  return (
    <Image
      height={48}
      width={48}
      src={"/ai-icon.jpg"}
      alt="AI Avatar"
      className="rounded-full shadow-md h-12 w-12 object-cover"
    />
  );
}

export const Avatar = memo(AvatarComponent);
