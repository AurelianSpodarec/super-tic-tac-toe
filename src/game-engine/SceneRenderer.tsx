'use client'
import { useSyncExternalStore } from "react";
import { sceneManager, SceneConfig } from "./SceneManager";

export function useScene(): SceneConfig | null {
  return useSyncExternalStore(
    (cb) => {
      sceneManager.on("sceneChange", cb as any);
      return () => sceneManager.off("sceneChange", cb as any);
    },
    () => sceneManager.getCurrentScene(),
    () => null
  );
}
