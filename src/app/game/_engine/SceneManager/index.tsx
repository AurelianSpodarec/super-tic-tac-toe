import { useEffect } from "react";

import ActionBar from "../../_components/ActionBar";

import BackgroundManager from "../BackgroundManager";
import { InputManager } from "../InputManager";
import { useAmbientAudioOnSceneChange } from "../audio/useAmbientAudioOnSceneChange";
import { useInitAudio } from "../audio/useInitAudio";
import NavigationProvider from "../navigation/NavigationProvider";
import { useNavigation } from "../navigation/useNavigation";
import type { SceneEntry } from "../navigation/types";
import { sceneRegistry } from "../settings";

function getInitialStack(): SceneEntry[] {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.has("join")) {
      // Deep-link to lobby join flow
      return [{ name: "Lobby", params: { flow: "join" } }];
    }
  }
  return [{ name: "Home" }];
}

function SceneManagerInner() {
  const { stack, pop } = useNavigation();
  const current = stack[stack.length - 1];

  useInitAudio(sceneRegistry);
  useAmbientAudioOnSceneChange(current.name, sceneRegistry);

  useEffect(() => {
    InputManager.start();

    const handleBack = () => pop();

    InputManager.on("back", handleBack);

    return () => {
      InputManager.off("back", handleBack);
      InputManager.stop();
    };
  }, [pop]);

  const SceneComp = sceneRegistry[current.name].component;

  return (
    <>
      <BackgroundManager scene={current} />
      <div className="absolute inset-0 z-10">
        <ActionBar />
        <SceneComp {...current.params} />
      </div>
    </>
  );
}

export default function SceneManager() {
  return (
    <NavigationProvider initialStack={getInitialStack()}>
      <SceneManagerInner />
    </NavigationProvider>
  );
}
