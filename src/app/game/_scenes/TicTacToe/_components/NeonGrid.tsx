'use client'

import { motion } from "motion/react";

const glowLayers = [
  { className: "glow-behind-1", blur: 24, opacity: 1 },
  { className: "glow-behind-2", blur: 10, opacity: 1 },
  { className: "glow-core", blur: 4, opacity: 1 },
  { className: "glow-over-1", blur: 0, opacity: 0.8 },
  { className: "glow-over-2", blur: 2, opacity: 0.9 },
];

// #d6787f - red
// #78d6c6 - blue
function NeonGrid({ size = 3, color = "#78d6c6", strokeWidth = 6, glow = true }) {
  const spacing = 300 / size;

  const createLine = (key, x1, y1, x2, y2, delay) => {
    // For glow, we create multiple layered lines
    return glowLayers.map((layer, i) => (
      <motion.line
        key={`${key}-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        initial={{ stroke: "#111", opacity: 0 }}
        animate={{ stroke: color, opacity: layer.opacity }}
        transition={{
          duration: 1,
          delay: delay + i * 0.05,
          ease: "easeInOut",
        }}
        className={glow ? layer.className : ""}
        style={{ filter: `blur(${layer.blur}px)` }}
      />
    ));
  };

  const lines = [];
  for (let i = 1; i < size; i++) {
    const pos = i * spacing;
    lines.push(...createLine(`v-${i}`, pos, 0, pos, 300, i * 0.2));
    lines.push(...createLine(`h-${i}`, 0, pos, 300, pos, i * 0.2 + 0.3));
  }

  return (
    <div className="relative">
      <svg width="350" height="350" viewBox="-20 -20 340 340" className="mx-auto">
        {lines}
      </svg>
    </div>
  );
}

export default NeonGrid
