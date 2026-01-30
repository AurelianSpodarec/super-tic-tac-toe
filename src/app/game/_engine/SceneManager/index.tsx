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
  const currentMeta = sceneRegistry[current.name];
  const isModal = currentMeta.presentation === "modal";

  const baseScene = isModal && stack.length > 1 ? stack[stack.length - 2] : current;
  const baseMeta = sceneRegistry[baseScene.name];

  useInitAudio(sceneRegistry);
  useAmbientAudioOnSceneChange(baseScene.name, sceneRegistry);

  useEffect(() => {
    InputManager.start();

    const handleBack = () => {
      pop();
      return true;
    };

    InputManager.on("back", handleBack);

    return () => {
      InputManager.off("back", handleBack);
      InputManager.stop();
    };
  }, [pop]);

  const BaseSceneComp = baseMeta.component;
  const ModalSceneComp = currentMeta.component;

  return (
    <>
      <BackgroundManager scene={baseScene} />
      <div className="absolute inset-0 z-10">
        <ActionBar />
        <BaseSceneComp {...baseScene.params} />
      </div>

      {isModal ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70"
            onClick={() => pop()}
          />

          <div className="relative z-[61] h-full w-full overflow-auto px-6 py-16">
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f0f10] shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="text-sm text-gray-200">Settings</div>
                <button
                  type="button"
                  aria-label="Close"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                  onClick={() => pop()}
                >
                  Close
                </button>
              </div>

              <div className="p-2">
                <ModalSceneComp {...current.params} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
