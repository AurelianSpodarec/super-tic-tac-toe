'use client'
import { motion, AnimatePresence } from "motion/react";

interface BackgroundProps {
  backgroundKey?: string;
  backgroundImage?: string;
}

export function SceneBackground({ backgroundKey, backgroundImage }: BackgroundProps) {
  const bgUrl = backgroundImage ?? (backgroundKey ? `/images/${backgroundKey}.jpg` : undefined);

  return (
    <AnimatePresence mode="wait">
      {bgUrl && (
        <motion.div
          key={bgUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      )}
    </AnimatePresence>
  );
}
