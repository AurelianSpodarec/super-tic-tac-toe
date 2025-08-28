import { motion } from "motion/react";
import { shape } from "./Shape";

function AnimatedO() {
  const startAngle = Math.floor(Math.random() * 360);
  const strokeColor = "#0d63f8"; // neon blue

  const glowStyle: React.CSSProperties = {
    ...shape,
    filter: `drop-shadow(0 0 6px ${strokeColor}) drop-shadow(0 0 12px ${strokeColor})`,
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-16 h-16"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        stroke={strokeColor}
        pathLength={1}
        strokeDasharray="0 1"
        transform={`rotate(${startAngle}, 50, 50)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: {
              delay: 0,
              duration: 0.6 + Math.random() * 0.6,
              ease: "easeInOut",
            },
            opacity: { duration: 0.01 },
          },
        }}
        style={glowStyle}
      />
    </motion.svg>
  );
}

export default AnimatedO
