import { useEffect, useRef } from "react";

import ActionBar from "../../_components/ActionBar";

import BackgroundManager from "../BackgroundManager";
import { InputManager } from "../InputManager";
import { AudioManager } from "../AudioManager";
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

  const baseIndex = (() => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const meta = sceneRegistry[stack[i].name] as SceneMeta;
      if (meta.presentation !== "modal") return i;
    }
    return 0;
  })();

  const baseScene = stack[baseIndex];
  const baseMeta = sceneRegistry[baseScene.name] as SceneMeta;

  const modalStack = stack.slice(baseIndex + 1);
  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const topModalMeta = topModal ? (sceneRegistry[topModal.name] as SceneMeta) : null;

  const topModalKind = topModalMeta?.modal?.kind ?? "panel";
  const isTopModalMuteAmbient = topModalMeta?.modal?.muteAmbient === true;

  // When a systemConfirm overlay is active, it should be the only modal the player sees.
  // (This matches the console-style “final confirmation” takeover.)
  const renderedModalStack = topModalKind === "systemConfirm" && topModal ? [topModal] : modalStack;
  const isModalOpen = renderedModalStack.length > 0;

  useInitAudio(sceneRegistry);
  useAmbientAudioOnSceneChange(baseScene.name, sceneRegistry);

  const wasAmbientMutedRef = useRef(false);
  useEffect(() => {
    if (isTopModalMuteAmbient) {
      if (!wasAmbientMutedRef.current) {
        AudioManager.stopAmbient();
        wasAmbientMutedRef.current = true;
      }
      return;
    }

    if (wasAmbientMutedRef.current) {
      // Resume whatever the base scene wants.
      const baseAudio = sceneRegistry[baseScene.name]?.audio;
      if (baseAudio) AudioManager.playAmbient(baseAudio);
      wasAmbientMutedRef.current = false;
    }
  }, [baseScene.name, isTopModalMuteAmbient]);

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

  const baseRenderKey = getRenderKey(baseScene);

  const topModalTitle = topModalMeta?.modal?.title ?? (topModal ? String(topModal.name) : "");
  const closeOnBackdrop = topModalMeta?.modal?.closeOnBackdrop ?? true;

  const backdropClassName = topModalKind === "systemConfirm" ? "bg-black" : "bg-black/70";

  return (
    <>
      <BackgroundManager scene={baseScene} />
      <div className="absolute inset-0 z-10">
        <ActionBar />
        <BaseSceneComp key={baseRenderKey} {...baseScene.params} />
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[60]">
          {closeOnBackdrop ? (
            <button
              type="button"
              aria-label="Close"
              className={`absolute inset-0 ${backdropClassName}`}
              onClick={() => pop()}
            />
          ) : (
            <div aria-hidden className={`absolute inset-0 ${backdropClassName}`} />
          )}

          {renderedModalStack.map((entry, i) => {
            const meta = sceneRegistry[entry.name] as SceneMeta;
            const Comp = meta.component;
            const title = meta.modal?.title ?? String(entry.name);
            const kind = meta.modal?.kind ?? "panel";
            const showChrome = meta.modal?.showChrome ?? kind !== "systemConfirm";
            const renderKey = getRenderKey(entry);

            const isTop = i === renderedModalStack.length - 1;

            // Stagger panels slightly so stacked modals feel intentional.
            const stackOffset = i * 10;

            if (kind === "systemConfirm") {
              return (
                <div
                  key={renderKey}
                  className="absolute inset-0 pointer-events-auto"
                  style={{ zIndex: 61 + i }}
                >
                  <div className="relative h-full w-full">
                    <Comp {...entry.params} />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={renderKey}
                className="absolute inset-0 flex items-start justify-center overflow-auto px-6 py-16 pointer-events-none"
                style={{ zIndex: 61 + i }}
              >
                <div
                  className={`mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f0f10] shadow-2xl ${
                    isTop ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{ transform: `translateY(${stackOffset}px)` }}
                >
                  {showChrome ? (
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                      <div className="text-sm text-gray-200">{title}</div>
                      <button
                        type="button"
                        aria-label="Close"
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                        onClick={() => pop()}
                      >
                        Close
                      </button>
                    </div>
                  ) : null}

                  <div className={showChrome ? "p-2" : "p-5"}>
                    <Comp {...entry.params} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Keep top modal title accessible to screen readers (since there may be multiple). */}
          <div className="sr-only" aria-live="polite">
            {topModalTitle}
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
