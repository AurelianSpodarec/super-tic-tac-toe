"use client";

import { createContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";

import { navigationReducer } from "./reducer";
import type { NavigationContextType, SceneEntry } from "./types";
import type { SceneName } from "../sceneRegistry";

export const NavigationContext = createContext<NavigationContextType | null>(null);

type Props = {
  initialStack: SceneEntry[];
  children: ReactNode;
};

export default function NavigationProvider({ initialStack, children }: Props) {
  const [stack, dispatch] = useReducer(navigationReducer, initialStack);

  const api = useMemo<NavigationContextType>(() => {
    function push(name: SceneName, params?: Record<string, unknown>) {
      dispatch({ type: "PUSH", name, params });
    }

    function pop() {
      dispatch({ type: "POP" });
    }

    function replace(name: SceneName, params?: Record<string, unknown>) {
      dispatch({ type: "REPLACE", name, params });
    }

    function replaceBelowTop(name: SceneName, params?: Record<string, unknown>) {
      dispatch({ type: "REPLACE_BELOW_TOP", name, params });
    }

    function reset(name: SceneName, params?: Record<string, unknown>) {
      dispatch({ type: "RESET", name, params });
    }

    return { push, pop, replace, replaceBelowTop, reset, stack };
  }, [stack]);

  return <NavigationContext.Provider value={api}>{children}</NavigationContext.Provider>;
}
