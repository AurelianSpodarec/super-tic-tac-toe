'use client';

import type { ReactNode } from "react";

type Hint = {
  icon: ReactNode;
  label: string;
};

type Props = {
  hints: Hint[];
  className?: string;
  variant?: "default" | "system";
};

export default function InputHints({ hints, className = "", variant = "default" }: Props) {
  const isSystem = variant === "system";

  const containerClassName = isSystem
    ? "text-[11px] text-gray-400 opacity-80"
    : "text-xs text-gray-300";

  const keycapClassName = isSystem
    ? "border-white/10 bg-white/0 text-gray-200"
    : "border-white/10 bg-white/5 text-gray-200";

  const keycapLayoutClassName = isSystem
    ? "h-6 leading-none"
    : "py-1 leading-none";

  // Normalize icon sizing so SVG hints don’t visually overpower key-label hints.
  const keycapIconSizingClassName = isSystem
    ? "[&>svg]:h-3 [&>svg]:w-3"
    : "";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 ${containerClassName} ${className}`}>
      {hints.map((h, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-md border px-2 text-[11px] ${keycapLayoutClassName} ${keycapIconSizingClassName} ${keycapClassName}`}
          >
            {h.icon}
          </div>
          <span className={isSystem ? "text-gray-300" : "text-gray-400"}>{h.label}</span>
        </div>
      ))}
    </div>
  );
}
