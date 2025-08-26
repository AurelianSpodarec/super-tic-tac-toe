'use client'

import { useEffect, useState } from "react";

const randomHue = () => Math.floor(Math.random() * 360);
const randomDur = () => (Math.random() * 4).toFixed(2);

function NeonGlory({ text }) {
  const [letters, setLetters] = useState(() =>
    Array.from(text).map((ch, i) => ({
      id: i,
      ch,
      hue: randomHue(),
      dur: randomDur(),
      version: 0, // used to force remount
    }))
  );

  useEffect(() => {
    setLetters(
      Array.from(text).map((ch, i) => ({
        id: i,
        ch,
        hue: randomHue(),
        dur: randomDur(),
        version: 0,
      }))
    );
  }, [text]);

  const recolor = (i) =>
    setLetters((prev) =>
      prev.map((l, idx) =>
        idx === i
          ? { ...l, hue: randomHue(), dur: randomDur(), version: l.version + 1 }
          : l
      )
    );

  return (
    <h1 className="flicker neon text-8xl mb-20 font-monoton">
      {letters.map((l, i) => (
        <span
          key={`${l.id}-${l.version}`} // <— key changes on click so React remounts
          onClick={(e) => {
            e.stopPropagation();
            recolor(i);
          }}
          style={{
            animation: `text-flicker-in-glow ${l.dur}s linear both`,
            color: `hsla(${l.hue}, 100%, 80%, 1)`,
            cursor: "pointer",
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {l.ch}
        </span>
      ))}
    </h1>
  );
}

function Logo() {
  return (
    <NeonGlory text="Tictactoe" />
  )
}

export default Logo
