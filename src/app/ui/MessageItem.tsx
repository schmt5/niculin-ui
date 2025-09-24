import { memo } from "react";
import { Message } from "../actions";
import { Avatar } from "./Avatar";
import { MessageContentTriage } from "./MessageContentTriage";

interface MessageItemProps {
  message: Message;
}

function MessageItemComponent({ message }: MessageItemProps) {
  if (message.role === "user") {
    return (
      <div className="bg-ni-200 border border-stone-300 p-2 rounded-md mx-4 my-4">
        {message.content}
      </div>
    );
  }

  return (
    <div className=" p-2 rounded-md my-2 flex flex-col gap-2 mx-4 ">
      <div className="shrink-0 mb-2">
        <Avatar />
      </div>
      <MessageContentTriage content={message.content} />
    </div>
  );
}

export const MessageItem = memo(MessageItemComponent);
