"use client";

import { useEffect, useRef, useState } from "react";
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
  const bgARef = useRef<HTMLDivElement>(null);
  const bgBRef = useRef<HTMLDivElement>(null);

  // Handle first interaction to allow autoplay
  useEffect(() => {
    const handleInteraction = () => {
      audioA.current.play().catch(() => {});
      audioB.current.play().catch(() => {});
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
    fadeInAudio.play().catch(() => {});

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

  useEffect(() => {
    if (!scene || !scene.backgroundKey) return;

    const fadeInBg = activeBg === "A" ? bgBRef.current : bgARef.current;
    const fadeOutBg = activeBg === "A" ? bgARef.current : bgBRef.current;

    if (!fadeInBg || !fadeOutBg) return;

    fadeInBg.style.backgroundImage = `url(${backgroundAssets[scene.backgroundKey]})`;
    fadeInBg.style.opacity = "0";
    fadeInBg.style.transition = `opacity ${bgDuration}ms ease`;
    fadeOutBg.style.transition = `opacity ${bgDuration}ms ease`;

    requestAnimationFrame(() => {
      fadeInBg.style.opacity = "1";
      fadeOutBg.style.opacity = "0";
    });

    setTimeout(() => setActiveBg(activeBg === "A" ? "B" : "A"), bgDuration);
  }, [currentSceneKey, scene, activeBg, backgroundAssets, bgDuration]);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }}>
      <div
        ref={bgARef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundPosition: "center",
          opacity: activeBg === "A" ? 1 : 0,
          transition: `opacity ${bgDuration}ms ease`,
        }}
      />
      <div
        ref={bgBRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundPosition: "center",
          opacity: activeBg === "B" ? 1 : 0,
          transition: `opacity ${bgDuration}ms ease`,
        }}
      />
    </div>
  );
}
