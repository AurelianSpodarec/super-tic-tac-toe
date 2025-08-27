import { useEffect, useState } from "react";

function generateLetters(text) {
  return text.split("\n").map((line) =>
    Array.from(line).map((ch, i) => ({
      id: i,
      ch,
      hue: randomHue(),
      dur: randomDur(),
      version: 0,
    }))
  );
}

const randomHue = () => Math.floor(Math.random() * 360);
const randomDur = () => (Math.random() * 4).toFixed(2);

function NeonText({ text, className = "text-8xl" }) {
  const [lines, setLines] = useState(() => generateLetters(text));

  useEffect(() => {
    setLines(generateLetters(text));
  }, [text]);

  const recolor = (lineIdx, letterIdx) => {
    setLines((prev) =>
      prev.map((line, lIdx) =>
        line.map((l, idx) =>
          lIdx === lineIdx && idx === letterIdx
            ? { ...l, hue: randomHue(), dur: randomDur(), version: l.version + 1 }
            : l
        )
      )
    );
  };

  return (
    <div className={`flicker neon${className}`}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} style={{ display: "block", lineHeight: "1em" }}>
          {line.map((l, i) => (
            <span
              key={`${l.id}-${l.version}`}
              onClick={(e) => {
                e.stopPropagation();
                recolor(lineIdx, i);
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
        </div>
      ))}
    </div>
  );
}

export default NeonText
