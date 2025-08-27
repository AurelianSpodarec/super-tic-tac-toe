'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useScene } from "./SceneRenderer";
import { SceneContext } from "./SceneContext";
import { SceneBackground } from "./SceneBackground";

const variants = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  slideLeft: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
  slideRight: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "100%" } },
  scale: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.2, opacity: 0 } },
};

export function SceneTransitionManager({ fallbackScene }: { fallbackScene?: React.ComponentType; }) {
  const nextScene = useScene();
  const [currentScene, setCurrentScene] = useState(nextScene);
  const [prevScene, setPrevScene] = useState<null | typeof nextScene>(null);
  const [exiting, setExiting] = useState(false);
  const [firstSceneReady, setFirstSceneReady] = useState(false);

  // Handle scene transitions
  useEffect(() => {
    if (!nextScene) return;

    if (!firstSceneReady) {
      setFirstSceneReady(true);
      setCurrentScene(nextScene);
      return;
    }

    if (nextScene.key === currentScene?.key) return;

    setPrevScene(currentScene);
    setExiting(true);

    const duration = currentScene?.transitionDuration ?? 300;
    const timer = setTimeout(() => {
      setCurrentScene(nextScene);
      setPrevScene(null);
      setExiting(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [nextScene, currentScene, firstSceneReady]);

  return (
    <AnimatePresence mode="wait">
      <SceneContext.Provider value={{ exiting }}>
        {/* Persistent background */}
        <SceneBackground
          backgroundKey={currentScene?.backgroundKey}
          backgroundImage={currentScene?.backgroundImage}
        />

        {/* Fallback */}
        {!firstSceneReady && fallbackScene && (
          <motion.div
            key="fallback"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            {React.createElement(fallbackScene)}
          </motion.div>
        )}

        {/* Previous scene */}
        {prevScene && (
          <motion.div
            key={`${prevScene.key}-prev`}
            initial="animate"
            animate="animate"
            exit="exit"
            variants={variants[prevScene.transitionType ?? "fade"]}
            transition={{ duration: (prevScene.transitionDuration ?? 300) / 1000 }}
            style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: 10 }}
          >
            <prevScene.component />
          </motion.div>
        )}

        {/* Current scene */}
        {currentScene && (
          <motion.div
            key={`${currentScene.key}-current`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants[currentScene.transitionType ?? "fade"]}
            transition={{ duration: (currentScene.transitionDuration ?? 300) / 1000 }}
            style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: 10 }}
          >
            <currentScene.component />
          </motion.div>
        )}
      </SceneContext.Provider>
    </AnimatePresence>
  );
}
