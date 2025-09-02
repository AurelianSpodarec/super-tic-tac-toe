'use client';

import { useEffect, useState } from "react";

interface NeonTextProps {
  text: string;
  className?: string;
  stagger?: number;
}

function NeonText({ text, className = "", stagger = 100 }: NeonTextProps) {
  const [turnedOnLetters, setTurnedOnLetters] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < text.length; i++) {
      timers.push(
        setTimeout(() => {
          setTurnedOnLetters((prev) => [...prev, i]);
        }, i * stagger)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [text, stagger]);

  return (
    <div className={`relative ${className}`} style={{ display: "inline-block" }}>

      <div className="absolute inset-0 text-gray-600 select-none">
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </div>

      <div className="relative">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className={`neon-logo-2 inline-block transition-opacity duration-500 ${turnedOnLetters.includes(i) ? "opacity-100" : "opacity-0"}`}
          >
            <span>{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default NeonText;
