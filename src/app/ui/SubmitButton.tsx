import { memo } from "react";

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

function SubmitButtonComponent({ loading, disabled }: SubmitButtonProps) {
  let icon;
  if (loading) {
    icon = (
      <svg
        height="16"
        width="16"
        className="animate-spin size-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  } else {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
      >
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
    );
  }

  return (
    <button
      type="submit"
      disabled={disabled}
      className="cursor-pointer disabled:cursor-not-allowed text-gray-700 disabled:text-gray-500 inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full p-[7px] h-fit absolute bottom-1/2 translate-y-1/2 right-2"
    >
      <span className="sr-only">Nachricht senden</span>
      {icon}
    </button>
  );
}

export const SubmitButton = memo(SubmitButtonComponent);
