import { useEffect, useRef } from "react";

import { AudioManager } from "../AudioManager";

type SceneWithAudio = { audio: string };

export function useAmbientAudioOnSceneChange(
  sceneName: string,
  sceneRegistry: Record<string, SceneWithAudio>
) {
  const prevSceneNameRef = useRef<string | null>(null);

  useEffect(() => {
    const prevSceneName = prevSceneNameRef.current;
    prevSceneNameRef.current = sceneName;

    const nextAudio = sceneRegistry[sceneName]?.audio;
    const prevAudio = prevSceneName ? sceneRegistry[prevSceneName]?.audio : null;

    if (nextAudio && prevAudio !== nextAudio) {
      AudioManager.playAmbient(nextAudio);
    }
  }, [sceneName, sceneRegistry]);
}
