'use client';

import { useEffect, useState } from "react";

interface NeonTextProps {
  text: string;
  className?: string;
  stagger?: number;
  animate?: boolean; // controlled externally via sequence
}

function NeonText({
  text,
  className = "",
  stagger = 100,
  animate = false, // default false, only turns true when sequence triggers
}: NeonTextProps) {
  const [turnedOnLetters, setTurnedOnLetters] = useState<number[]>([]);

  useEffect(() => {
    if (!animate) {
      setTurnedOnLetters([]); // reset until triggered
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < text.length; i++) {
      timers.push(
        setTimeout(() => {
          setTurnedOnLetters((prev) => [...prev, i]);
        }, i * stagger)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [text, stagger, animate]);

  return (
    <div className={`relative ${className}`} style={{ display: "inline-block" }}>
      {/* Shadow layer */}
      <div className="absolute inset-0 text-gray-600 select-none">
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </div>

      {/* Neon layer */}
      <div className="relative">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className={`neon-logo-2 inline-block transition-opacity duration-500 ${
              turnedOnLetters.includes(i) ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default NeonText;
