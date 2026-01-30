import { useEffect, useRef } from "react";

import ActionBar from "../../_components/ActionBar";

import BackgroundManager from "../BackgroundManager";
import { InputManager } from "../InputManager";
import { useAmbientAudioOnSceneChange } from "../audio/useAmbientAudioOnSceneChange";
import { useInitAudio } from "../audio/useInitAudio";
import NavigationProvider from "../navigation/NavigationProvider";
import { useNavigation } from "../navigation/useNavigation";
import type { SceneEntry } from "../navigation/types";
import { sceneRegistry, type SceneMeta } from "../settings";

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

function getRenderKey(entry: SceneEntry) {
  const k = entry.params?.__key;
  if (typeof k === "string" || typeof k === "number") return `${entry.name}:${k}`;
  return entry.name;
}

function SceneManagerInner() {
  const { stack, pop, push } = useNavigation();

  const current = stack[stack.length - 1];
  const currentMeta = sceneRegistry[current.name] as SceneMeta;
  const isModal = currentMeta.presentation === "modal";

  const baseScene = isModal && stack.length > 1 ? stack[stack.length - 2] : current;
  const baseMeta = sceneRegistry[baseScene.name] as SceneMeta;

  useInitAudio(sceneRegistry);
  useAmbientAudioOnSceneChange(baseScene.name, sceneRegistry);

  const stackRef = useRef(stack);
  const popRef = useRef(pop);
  const pushRef = useRef(push);

  useEffect(() => {
    stackRef.current = stack;
    popRef.current = pop;
    pushRef.current = push;
  }, [pop, push, stack]);

  useEffect(() => {
    InputManager.start();

    const handleBack = () => {
      const activeStack = stackRef.current;
      const top = activeStack[activeStack.length - 1];
      const topMeta = sceneRegistry[top.name];

      if (topMeta.presentation === "modal") {
        popRef.current();
        return true;
      }

      if (top.name === "Game") {
        pushRef.current("Pause");
        return true;
      }

      popRef.current();
      return true;
    };

    InputManager.on("back", handleBack);

    return () => {
      InputManager.off("back", handleBack);
      InputManager.stop();
    };
  }, []);

  const BaseSceneComp = baseMeta.component;
  const ModalSceneComp = currentMeta.component;

  const baseRenderKey = getRenderKey(baseScene);
  const modalRenderKey = getRenderKey(current);

  const modalTitle = currentMeta.modal?.title ?? String(current.name);
  const closeOnBackdrop = currentMeta.modal?.closeOnBackdrop ?? true;

  return (
    <>
      <BackgroundManager scene={baseScene} />
      <div className="absolute inset-0 z-10">
        <ActionBar />
        <BaseSceneComp key={baseRenderKey} {...baseScene.params} />
      </div>

      {isModal ? (
        <div className="fixed inset-0 z-[60]">
          {closeOnBackdrop ? (
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-black/70"
              onClick={() => pop()}
            />
          ) : (
            <div aria-hidden className="absolute inset-0 bg-black/70" />
          )}

          <div className="relative z-[61] h-full w-full overflow-auto px-6 py-16">
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f0f10] shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="text-sm text-gray-200">{modalTitle}</div>
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
                <ModalSceneComp key={modalRenderKey} {...current.params} />
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
