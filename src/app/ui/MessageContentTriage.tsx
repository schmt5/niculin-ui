import { memo } from "react";
import { OptionCard } from "./OptionCard";

function MessageContentTriageComponent({ content }: { content: string }) {
  const data = JSON.parse(content);
  console.log(data);

  if (data.type === "complex") {
    return (
      <div>
        <div className="whitespace-pre-wrap">{data.intro}</div>
        <div className="flex flex-col gap-4 my-4">
          {data.options.map((option: any) => (
            <OptionCard key={option.option_id} option={option} />
          ))}
        </div>
        <div className="whitespace-pre-wrap">{data.outro}</div>
        <p>{data.content}</p>
      </div>
    );
  }

  return <div className="whitespace-pre-wrap">{data}</div>;
}

export const MessageContentTriage = memo(MessageContentTriageComponent);
