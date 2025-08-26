"use client";

import { ReactNode, useRef, useEffect } from "react";
import { SceneManagerProvider, Scene } from "./SceneManagerProvider";

interface Props {
  initialScene: string;
  scenes: Scene[];
  children?: ReactNode;
}

export function GameProvider({ initialScene = "start", scenes, children }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <SceneManagerProvider initialScene={initialScene} scenes={scenes}>
      <audio ref={audioRef} src="/audio/jazz-cafe-crowd.mp3" autoPlay preload="auto" loop />
      {children}
    </SceneManagerProvider>
  );
}
