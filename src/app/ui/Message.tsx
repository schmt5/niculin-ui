import { memo } from "react";
import { Avatar } from "./AiAvatar";

interface MessageProps {
  message: any;
}

function MessageComponent({ message }: MessageProps) {
  if (message.role === "user") {
    return (
      <div className="bg-ni-200 border border-stone-300 p-2 rounded-md mx-4 my-4">
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return <div key={`${message.id}-${i}`}>{part.text}</div>;
          }
        })}
      </div>
    );
  }

  return (
    <div className=" p-2 rounded-md my-2 flex flex-col gap-2 mx-4 ">
      <div className="shrink-0 mb-2">
        <Avatar />
      </div>
      <div className="whitespace-pre-wrap">
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return <div key={`${message.id}-${i}`}>{part.text}</div>;
          }
        })}
      </div>
    </div>
  );
}

export const Message = memo(MessageComponent);
