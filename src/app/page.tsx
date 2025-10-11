"use client";

import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";
import { Chat } from "./ui/Chat";

export default function App() {
  const accentColorCode = process.env.NEXT_PUBLIC_ACCENT_COLOR || "015a9d";
  const accentColor = `#${accentColorCode}`;

  const isClient = useIsClient();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
  }, [accentColor]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="ni-app hidden xs:block w-full h-[580px] mx-auto relative border border-stone-300 rounded-xs">
      <Chat />
    </div>
  );
}
