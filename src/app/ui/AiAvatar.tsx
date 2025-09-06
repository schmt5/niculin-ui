import Image from "next/image";
import { memo } from "react";

function AvatarComponent() {
  return (
    <Image
      height={48}
      width={48}
      src={"/ai-icon.jpg"}
      alt="AI Avatar"
      className="rounded-md shadow-md h-12 w-12 object-cover"
    />
  );
}

export const Avatar = memo(AvatarComponent);
