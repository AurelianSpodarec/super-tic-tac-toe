import { useEffect, useRef, useState } from "react";

// Generate letters with hue/dur/version
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

function NeonText({ text, className }) {
  const [lines, setLines] = useState(() => generateLetters(text));
  const audioRef = useRef(null);

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

  const handleHover = (lineIdx, letterIdx) => {
    // Play electric sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    // 80% chance to recolor
    if (Math.random() < 0.33) {
      recolor(lineIdx, letterIdx);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev];
        const lineCount = newLines.length;

        const lettersToChange = Math.floor(Math.random() * 2) + 1;
        let soundPlays = 0;

        for (let i = 0; i < lettersToChange; i++) {
          const randomLine = Math.floor(Math.random() * lineCount);
          const lineLength = newLines[randomLine].length;
          const randomLetter = Math.floor(Math.random() * lineLength);

          // Recolor the letter
          newLines[randomLine][randomLetter] = {
            ...newLines[randomLine][randomLetter],
            hue: randomHue(),
            dur: randomDur(),
            version: newLines[randomLine][randomLetter].version + 1,
          };

          // Play sound, max 2 times per interval
          if (audioRef.current && soundPlays < 2) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            soundPlays++;
          }
        }

        return newLines;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flicker neon ${className}`}>
      <audio ref={audioRef} src="/audio/electric-zap.mp3" preload="auto" />
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} style={{ display: "block", lineHeight: "1em" }}>
          {line.map((l, i) => (
            <span
              key={`${l.id}-${l.version}`}
              onMouseEnter={() => handleHover(lineIdx, i)}
              onClick={(e) => {
                e.stopPropagation();
                recolor(lineIdx, i);
              }}
              style={{
                animation: `text-flicker-in-glow ${l.dur}s linear both`,
                color: `hsla(${l.hue}, 100%, 80%, 1)`,
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

export default NeonText;
