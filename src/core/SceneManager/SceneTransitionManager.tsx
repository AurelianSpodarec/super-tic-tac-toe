"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scene } from "./SceneManagerProvider";

interface Props {
  currentSceneKey: string;
  getScene: (key: string) => Scene | undefined;
  audioAssets: Record<string, string>;
  backgroundAssets: Record<string, string>;
}

export function SceneTransitionManager({ currentSceneKey, getScene, audioAssets, backgroundAssets }: Props) {
  // Audio
  const audioA = useRef<HTMLAudioElement>(new Audio());
  const audioB = useRef<HTMLAudioElement>(new Audio());
  const [currentAudioKey, setCurrentAudioKey] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<"A" | "B">("A");

  // Background
  const [activeBg, setActiveBg] = useState<"A" | "B">("A");

  // Handle first interaction to allow autoplay
  useEffect(() => {
    const handleInteraction = () => {
      audioA.current.play().catch(() => { });
      audioB.current.play().catch(() => { });
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const scene = getScene(currentSceneKey);
  const audioDuration = scene?.transitionDuration ?? 1000;
  const bgDuration = scene?.transitionDuration ?? 500;

  // Audio crossfade
  useEffect(() => {
    if (!scene || !scene.audioKey) return;
    if (scene.audioKey === currentAudioKey) return;

    const prevScene = currentAudioKey ? getScene(currentAudioKey) : null;
    prevScene?.onExit?.();

    const fadeInAudio = activeAudio === "A" ? audioB.current : audioA.current;
    const fadeOutAudio = activeAudio === "A" ? audioA.current : audioB.current;

    fadeInAudio.src = audioAssets[scene.audioKey];
    fadeInAudio.volume = 0;
    fadeInAudio.loop = true;
    fadeInAudio.play().catch(() => { });

    const start = performance.now();
    const fade = (time: number) => {
      const progress = Math.min((time - start) / audioDuration, 1);
      fadeInAudio.volume = progress;
      fadeOutAudio.volume = 1 - progress;
      if (progress < 1) requestAnimationFrame(fade);
      else {
        fadeOutAudio.pause();
        setActiveAudio(activeAudio === "A" ? "B" : "A");
        scene.onEnter?.();
      }
    };
    requestAnimationFrame(fade);
    setCurrentAudioKey(scene.audioKey);
  }, [currentSceneKey, scene, currentAudioKey, activeAudio, audioAssets, audioDuration, getScene]);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {scene?.backgroundKey && (
          <>
            {activeBg === "A" && (
              <motion.div
                key="bgA"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: bgDuration / 1000, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  backgroundImage: `url(${backgroundAssets[scene.backgroundKey]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                onAnimationComplete={() => setActiveBg("B")}
              />
            )}
            {activeBg === "B" && (
              <motion.div
                key="bgB"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: bgDuration / 1000, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  backgroundImage: `url(${backgroundAssets[scene.backgroundKey]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                onAnimationComplete={() => setActiveBg("A")}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
