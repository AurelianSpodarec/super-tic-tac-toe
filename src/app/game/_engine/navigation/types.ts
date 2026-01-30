import type { SceneName } from "../sceneRegistry";

export type SceneEntry = {
  name: SceneName;
  params?: Record<string, unknown>;
};

export type NavigationContextType = {
  push: (name: SceneName, params?: Record<string, unknown>) => void;
  pop: () => void;
  replace: (name: SceneName, params?: Record<string, unknown>) => void;
  /**
   * Replaces the scene just below the top of the stack.
   * Useful for updating the base scene while a modal overlay is open.
   */
  replaceBelowTop: (name: SceneName, params?: Record<string, unknown>) => void;
  reset: (name: SceneName, params?: Record<string, unknown>) => void;
  stack: SceneEntry[];
};
