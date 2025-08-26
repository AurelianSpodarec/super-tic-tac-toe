'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useScene } from "./SceneRenderer";
import { SceneContext } from "./SceneContext";

const variants = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  slideLeft: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
  slideRight: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "100%" } },
  scale: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.2, opacity: 0 } },
};

export function SceneTransitionManager() {
  const nextScene = useScene();
  const [prevScene, setPrevScene] = useState<null | typeof nextScene>(null);
  const [displayScene, setDisplayScene] = useState(nextScene);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!nextScene || nextScene.key === displayScene?.key) return;

    setPrevScene(displayScene);
    setExiting(true);

    const duration = nextScene.transitionDuration ?? 300;
    const timer = setTimeout(() => {
      setDisplayScene(nextScene);
      setPrevScene(null);
      setExiting(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [nextScene]);

  return (
    <AnimatePresence mode="wait">
      <SceneContext.Provider value={{ exiting }}>
        {prevScene && (
          <motion.div
            key={`${prevScene.key}-prev`}
            initial="animate"
            animate="animate"
            exit="exit"
            variants={variants[prevScene.transitionType ?? "fade"]}
            transition={{ duration: ((prevScene.transitionDuration ?? 300) / 1000) }}
            style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
          >
            <prevScene.component />
          </motion.div>
        )}

        {displayScene && (
          <motion.div
            key={`${displayScene.key}-display`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants[displayScene.transitionType ?? "fade"]}
            transition={{ duration: ((displayScene.transitionDuration ?? 300) / 1000) }}
            style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
          >
            <displayScene.component />
          </motion.div>
        )}
      </SceneContext.Provider>
    </AnimatePresence>
  );
}
