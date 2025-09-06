import { memo } from "react";

interface SubmitButtonProps {
  loading: boolean;
}

function SubmitButtonComponent({ loading }: SubmitButtonProps) {
  let icon;
  if (loading) {
    icon = (
      <svg
        height="16"
        width="16"
        className="animate-spin h-4 w-4 text-white"
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
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="w-4 text-white"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  }

  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-ni-600 inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full p-[7px] h-fit absolute bottom-1/2 translate-y-1/2 right-2 text-white"
    >
      <span className="sr-only">Nachricht senden</span>
      {icon}
    </button>
  );
}

export const SubmitButton = memo(SubmitButtonComponent);
