
import { useContext, useState, createContext } from "react";

export interface Scene {
  key: string;
  component: React.ReactNode;
  backgroundKey?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface SceneManagerContextType {
  stack: string[];
  currentScene: string | null;
  getScene: (key: string) => Scene | undefined;
  switchScene: (key: string) => void;
  pushScene: (key: string) => void;
  popScene: () => void;
  back: (overrideKey?: string) => void;
  isMenuScene: boolean;
}

const SceneManagerContext = createContext<SceneManagerContextType | null>(null);
export const useSceneManager = () => {
  const ctx = useContext(SceneManagerContext);
  if (!ctx) throw new Error("useSceneManager must be used inside SceneManagerProvider");
  return ctx;
};

// ------------------------
// Scene Manager Provider
// ------------------------
interface Props {
  initialScene: string;
  menuSceneKey: string;
  scenes: Scene[];
  children: React.ReactNode;
}

export function SceneManagerProvider({ initialScene, scenes, children }: Props) {
  const [stack, setStack] = useState<string[]>([initialScene]);

  const getScene = (key: string) => scenes.find((s) => s.key === key);

  const switchScene = (key: string) => {
    const oldKey = stack[stack.length - 1];
    getScene(oldKey)?.onExit?.();
    getScene(key)?.onEnter?.();
    setStack([key]);
  };

  const pushScene = (key: string) => {
    getScene(key)?.onEnter?.();
    setStack((prev) => [...prev, key]);
  };

  const popScene = () => {
    if (stack.length <= 1) return;
    const oldKey = stack[stack.length - 1];
    getScene(oldKey)?.onExit?.();
    setStack((prev) => prev.slice(0, -1));
  };

  const back = (overrideKey?: string) => {
    if (overrideKey) {
      const oldKey = stack[stack.length - 1];
      getScene(oldKey)?.onExit?.();
      getScene(overrideKey)?.onEnter?.();
      setStack([overrideKey]);
    } else {
      popScene();
    }
  };

  const currentScene = stack[stack.length - 1] || null;
  const isMenuScene = currentScene === initialScene;

  return (
    <SceneManagerContext.Provider
      value={{ stack, getScene, switchScene, pushScene, popScene, back, currentScene, isMenuScene }}
    >
      {children}
    </SceneManagerContext.Provider>
  );
}
