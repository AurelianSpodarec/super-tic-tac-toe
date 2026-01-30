import type { SceneName } from "../sceneRegistry";

export type SceneEntry = {
  name: SceneName;
  params?: Record<string, unknown>;
};

export type NavigationContextType = {
  push: (name: SceneName, params?: Record<string, unknown>) => void;
  pop: () => void;
  replace: (name: SceneName, params?: Record<string, unknown>) => void;
  reset: (name: SceneName, params?: Record<string, unknown>) => void;
  stack: SceneEntry[];
};
