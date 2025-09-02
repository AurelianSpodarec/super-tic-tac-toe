import { createContext, useContext, useEffect, useRef, useState } from "react";
import ActionBar from "../_components/ActionBar";
import BackgroundManager from "./BackgroundManager";
import { AudioManager } from "./AudioManager";
import { sceneRegistry } from "./settings";
import { InputManager } from "./InputManager";

export type SceneName = keyof typeof sceneRegistry;
export type BackgroundEntry =
  | {
    type: "image";
    src: string;
    backgroundSize?: string
  }
  | { type: "overlay" };

export type SceneEntry = {
  name: SceneName;
  params?: Record<string, any>;
  background?: BackgroundEntry[];
};

type NavigationContextType = {
  push: (name: SceneName, params?: Record<string, any>) => void;
  pop: () => void;
  replace: (name: SceneName, params?: Record<string, any>) => void;
  reset: (name: SceneName, params?: Record<string, any>) => void;
  stack: SceneEntry[];
};

const NavigationContext = createContext<NavigationContextType | null>(null);

/* =================== SceneManager =================== */
export function SceneManager() {
  const [stack, setStack] = useState<SceneEntry[]>([{ name: "Home" }]);
  const current = stack[stack.length - 1];
  const previousRef = useRef<SceneEntry | null>(null);

  // Preload audio and init unlock
  // SceneManager.tsx

  useEffect(() => {
    Object.values(sceneRegistry).forEach(scene => AudioManager.preload(scene.audio));
    AudioManager.initUnlockListener();
    InputManager.start();

    // ✅ Global back handler
    const handleBack = () => {
      setStack(prev => {
        if (prev.length > 1) {
          const newStack = prev.slice(0, -1);
          const newScene = newStack[newStack.length - 1];
          if (sceneRegistry[newScene.name].audio !== sceneRegistry[prev[prev.length - 1].name].audio) {
            AudioManager.playAmbient(sceneRegistry[newScene.name].audio);
          }
          return newStack;
        }
        return prev; // at root, do nothing
      });
    };

    InputManager.on("back", handleBack);

    return () => {
      InputManager.off("back", handleBack);
      InputManager.stop();
    };
  }, []);


  // Play ambient audio on scene change
  useEffect(() => {
    if (!current) return;
    const prev = previousRef.current;
    previousRef.current = current;
    const newAudio = sceneRegistry[current.name].audio;
    const prevAudio = prev ? sceneRegistry[prev.name].audio : null;
    if (prevAudio !== newAudio) AudioManager.playAmbient(newAudio);
  }, [current.name]);

  function push(name: SceneName, params?: Record<string, any>) { setStack(prev => [...prev, { name, params }]); }
  function pop() {
    setStack(prev => {
      if (prev.length <= 1) return prev;
      const newStack = prev.slice(0, -1);
      const newScene = newStack[newStack.length - 1];
      if (sceneRegistry[newScene.name].audio !== sceneRegistry[prev[prev.length - 1].name].audio) {
        AudioManager.playAmbient(sceneRegistry[newScene.name].audio);
      }
      return newStack;
    });
  }
  function replace(name: SceneName, params?: Record<string, any>) {
    setStack(prev => {
      const newStack = [...prev.slice(0, -1), { name, params }];
      const newAudio = sceneRegistry[name].audio;
      const prevAudio = prev[prev.length - 1].name ? sceneRegistry[prev[prev.length - 1].name].audio : null;
      if (newAudio !== prevAudio) AudioManager.playAmbient(newAudio);
      return newStack;
    });
  }
  function reset(name: SceneName, params?: Record<string, any>) {
    setStack([{ name, params }]);
    AudioManager.playAmbient(sceneRegistry[name].audio);
  }

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

export function useScene() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useScene must be used inside <SceneManager>");
  return ctx;
}