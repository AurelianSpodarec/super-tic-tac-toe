'use client';

import type { ReactNode } from "react";

type Hint = {
  icon: ReactNode;
  label: string;
};

type Props = {
  hints: Hint[];
  className?: string;
};

export default function InputHints({ hints, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-gray-300 ${className}`}>
      {hints.map((h, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-200">
            {h.icon}
          </div>
          <span className="text-gray-400">{h.label}</span>
        </div>
      ))}
    </div>
  );
}
