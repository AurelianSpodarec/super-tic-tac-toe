import { createContext, useEffect, useRef, useState } from "react";

import ActionBar from "../../_components/ActionBar";

import BackgroundManager from "../BackgroundManager";
import { AudioManager } from "../AudioManager";
import { sceneRegistry } from "../settings";
import { InputManager } from "../InputManager";

export type SceneName = keyof typeof sceneRegistry;
export type BackgroundEntry =
  | { type: "image"; src: string; backgroundSize?: string }
  | { type: "overlay" };

export type SceneEntry = {
  name: SceneName;
  params?: Record<string, unknown>;
  background?: BackgroundEntry[];
};

export type NavigationContextType = {
  push: (name: SceneName, params?: Record<string, unknown>) => void;
  pop: () => void;
  replace: (name: SceneName, params?: Record<string, unknown>) => void;
  reset: (name: SceneName, params?: Record<string, unknown>) => void;
  stack: SceneEntry[];
};

export const NavigationContext = createContext<NavigationContextType | null>(null);

function SceneManager() {
  const [stack, setStack] = useState<SceneEntry[]>([{ name: "Home" }]);
  const current = stack[stack.length - 1];
  const previousRef = useRef<SceneEntry | null>(null);

  // FUNCTIONS
  // ----------------------------------------------------------------
  function push(name: SceneName, params?: Record<string, unknown>) {
    setStack(prev => [...prev, { name, params }]);
  }

  function pop() {
    setStack(prev => popStack(prev));
  }

  function replace(name: SceneName, params?: Record<string, unknown>) {
    setStack(prev => {
      const newStack = [...prev.slice(0, -1), { name, params }];
      playAudioIfChanged(prev[prev.length - 1], newStack[newStack.length - 1]);
      return newStack;
    });
  }

  function reset(name: SceneName, params?: Record<string, unknown>) {
    setStack([{ name, params }]);
    AudioManager.playAmbient(sceneRegistry[name].audio);
  }

  function playAmbientOnSceneChange(prevScene: SceneEntry | null, currentScene: SceneEntry) {
    const newAudio = sceneRegistry[currentScene.name]?.audio;
    const prevAudio = prevScene ? sceneRegistry[prevScene.name]?.audio : null;
    if (newAudio && prevAudio !== newAudio) AudioManager.playAmbient(newAudio);
  }

  function popStack(stack: SceneEntry[]) {
    if (stack.length <= 1) return stack;
    const newStack = stack.slice(0, -1);
    const prevScene = stack[stack.length - 1];
    const currentScene = newStack[newStack.length - 1];
    playAudioIfChanged(prevScene, currentScene);
    return newStack;
  }

  function playAudioIfChanged(prevScene: SceneEntry, currentScene: SceneEntry) {
    const prevAudio = sceneRegistry[prevScene.name]?.audio;
    const currentAudio = sceneRegistry[currentScene.name]?.audio;
    if (prevAudio !== currentAudio) {
      AudioManager.playAmbient(currentAudio);
    }
  }

  // USE EFFECT
  // ----------------------------------------------------------------
  useEffect(() => {
    Object.values(sceneRegistry).forEach(scene => AudioManager.preload(scene.audio));
    AudioManager.initUnlockListener();
    InputManager.start();

    const handleBack = () => {
      setStack(prev => popStack(prev));
    };

    InputManager.on("back", handleBack);

    return () => {
      InputManager.off("back", handleBack);
      InputManager.stop();
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const prev = previousRef.current;
    previousRef.current = current;
    playAmbientOnSceneChange(prev, current);
  }, [current.name]);

  const SceneComp = sceneRegistry[current.name].component;

  return (
    <NavigationContext.Provider value={{ push, pop, replace, reset, stack }}>
      <BackgroundManager scene={current} />
      <div className="absolute inset-0 z-10">
        <ActionBar />
        <SceneComp {...current.params} />
      </div>
    </NavigationContext.Provider>
  );
}

export default SceneManager;
