import { memo } from "react";
import { OptionCard } from "./OptionCard";
import { parseApiResponse } from "../utils/parseApiResponse";

function MessageContentTriageComponent({ content }: { content: string }) {
  const data = parseApiResponse(content);

  if (data.type === "json") {
    return (
      <div>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: data.htmlBefore }}
        ></div>
        <div className="flex flex-col gap-4 my-4">
          {data.json.options?.map((option) => (
            <OptionCard key={option.option_id} option={option} />
          ))}
        </div>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: data.htmlAfter }}
        ></div>
      </div>
    );
  }

  if (data.type === "text") {
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: data.htmlBefore }}
      ></div>
    );
  }

  return null;
}

export const MessageContentTriage = memo(MessageContentTriageComponent);
