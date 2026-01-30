'use client'

import { useMemo, useState } from "react";

import type { ChatMessage } from "@/app/game/_engine/Multiplayer";

type Props = {
  title?: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  heightClassName?: string;
};

export default function ChatPanel({
  title = "Chat",
  messages,
  onSend,
  heightClassName = "h-[420px]",
}: Props) {
  const [text, setText] = useState("");
  const sorted = useMemo(() => [...messages].sort((a, b) => a.timestamp - b.timestamp), [messages]);

  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col ${heightClassName}`}>
      <div className="text-xs text-gray-400 mb-3">{title}</div>

      <div className="flex-1 overflow-auto pr-1 space-y-2">
        {sorted.length === 0 ? (
          <div className="text-sm text-gray-500">Say hi.</div>
        ) : (
          sorted.map((m) => (
            <div key={m.id} className="text-sm">
              <span className="text-gray-300 font-semibold">{m.sender}:</span>{" "}
              <span className="text-gray-100">{m.text}</span>
            </div>
          ))
        )}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const t = text.trim();
          if (!t) return;
          onSend(t);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message…"
          className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/15 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
