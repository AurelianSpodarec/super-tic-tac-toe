import { motion } from "motion/react";
import { shape } from "./Shape";

function AnimatedX() {
  // fresh randoms each render
  const firstStroke = Math.random() > 0.5;
  const duration1 = 0.4 + Math.random() * 0.6;
  const duration2 = 0.4 + Math.random() * 0.6;
  const delay2 = Math.random() * 0.4;

  const strokeColor = "#ff0088"; // neon pink

  const glowStyle: React.CSSProperties = {
    ...shape,
    filter: `drop-shadow(0 0 6px ${strokeColor}) drop-shadow(0 0 12px ${strokeColor})`,
  };

  const line1 = (
    <motion.line
      key="l1"
      x1="20"
      y1="20"
      x2="80"
      y2="80"
      stroke={strokeColor}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay: 0, duration: duration1, ease: "easeInOut" },
          opacity: { delay: 0, duration: 0.01 },
        },
      }}
      style={glowStyle}
    />
  );

  const line2 = (
    <motion.line
      key="l2"
      x1="20"
      y1="80"
      x2="80"
      y2="20"
      stroke={strokeColor}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay: delay2, duration: duration2, ease: "easeInOut" },
          opacity: { delay: delay2, duration: 0.01 },
        },
      }}
      style={glowStyle}
    />
  );

  const strokes = firstStroke ? [line1, line2] : [line2, line1];

  return (
    <motion.svg viewBox="0 0 100 100" className="w-16 h-16">
      {strokes}
    </motion.svg>
  );
}

export default AnimatedX
