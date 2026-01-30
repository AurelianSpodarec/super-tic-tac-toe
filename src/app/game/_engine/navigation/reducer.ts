import type { SceneEntry } from "./types";
import type { SceneName } from "../sceneRegistry";

export type NavigationAction =
  | { type: "PUSH"; name: SceneName; params?: Record<string, unknown> }
  | { type: "POP" }
  | { type: "REPLACE"; name: SceneName; params?: Record<string, unknown> }
  | { type: "REPLACE_BELOW_TOP"; name: SceneName; params?: Record<string, unknown> }
  | { type: "RESET"; name: SceneName; params?: Record<string, unknown> };

export function navigationReducer(stack: SceneEntry[], action: NavigationAction): SceneEntry[] {
  switch (action.type) {
    case "PUSH":
      return [...stack, { name: action.name, params: action.params }];

    case "POP":
      return stack.length <= 1 ? stack : stack.slice(0, -1);

    case "REPLACE":
      return stack.length === 0
        ? [{ name: action.name, params: action.params }]
        : [...stack.slice(0, -1), { name: action.name, params: action.params }];

    case "REPLACE_BELOW_TOP":
      if (stack.length <= 1) return [{ name: action.name, params: action.params }];
      return [...stack.slice(0, -2), { name: action.name, params: action.params }, stack[stack.length - 1]];

    case "RESET":
      return [{ name: action.name, params: action.params }];

    default:
      return stack;
  }
}
