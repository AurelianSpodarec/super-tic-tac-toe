import { useEffect } from "react";

import { AudioManager } from "../AudioManager";

type SceneWithAudio = { audio: string };

export function useInitAudio(sceneRegistry: Record<string, SceneWithAudio>) {
  useEffect(() => {
    Object.values(sceneRegistry).forEach((scene) => AudioManager.preload(scene.audio));
    AudioManager.initUnlockListener();
  }, [sceneRegistry]);
}
