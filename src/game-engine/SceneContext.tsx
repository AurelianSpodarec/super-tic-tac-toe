  import { createContext, useContext } from "react";

  export interface SceneContextValue {
    exiting: boolean;
  }

  export const SceneContext = createContext<SceneContextValue>({ exiting: false });

  export function useSceneExiting() {
    return useContext(SceneContext).exiting;
  }
