"use client";

import { ReactNode } from "react";
import { SceneManagerProvider, useSceneManager, Scene } from "./SceneManagerProvider";
import { SceneTransitionManager } from "./SceneTransitionManager";

interface Props {
  initialScene: string;
  scenes: Scene[];
  children?: ReactNode;
}

export function GameProvider({ initialScene, scenes, children }: Props) {
  const audioAssets = {
    menu: "/audio/jazz-cafe-crowd.mp3",
    tictactoe: "/audio/flickering-neon.mp3",
    gameMenu: "/audio/jazz-cafe-crowd.mp3",
  };

  const backgroundAssets = {
    menu: "/images/brick.svg",
    tictactoe: "/images/bollywood.jpg",
    gameMenu: "/images/brick.svg",
  };

  return (
    <SceneManagerProvider initialScene={initialScene} scenes={scenes}>
      <InnerGameProvider
        audioAssets={audioAssets}
        backgroundAssets={backgroundAssets}
      >
        {children}
      </InnerGameProvider>
    </SceneManagerProvider>
  );
}

function InnerGameProvider({
  audioAssets,
  backgroundAssets,
  children,
}: {
  audioAssets: Record<string, string>;
  backgroundAssets: Record<string, string>;
  children: ReactNode;
}) {
  const { currentScene, getScene } = useSceneManager();
  if (!currentScene) return null;

  return (
    <>
      <SceneTransitionManager
        currentSceneKey={currentScene}
        getScene={getScene}
        audioAssets={audioAssets}
        backgroundAssets={backgroundAssets}
      />
      {children}
    </>
  );
}
