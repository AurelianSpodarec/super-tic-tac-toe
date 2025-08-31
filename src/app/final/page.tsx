'use client'

import React, { useState, createContext, useContext, useMemo } from "react";

import SceneStart from "./_scenes/Start";
import SceneGameModes from "./_scenes/GameModes";
import SceneGameTicTacToe from "./_scenes/TicTacToe";
import ActionBar from "./_components/ActionBar";

const audioRegistry = {
  home: "audio/relaxing-jazz-saxophone.mp3",
  game: "audio/jazz-cafe-crowd.mp3"
};

const sceneRegistry = {
  Home: {
    component: SceneStart,
    background: [
      { type: "image", src: "/images/brick.svg", backgroundSize: '42px' },
      { type: "overlay" }
    ],
    audio: audioRegistry.home
  },
  GameModes: {
    component: SceneGameModes,
    background: [
      { type: "image", src: "/images/brick.svg", backgroundSize: '42px' },
      { type: "overlay" }
    ],
    audio: audioRegistry.home
  },
  Game: {
    component: SceneGameTicTacToe,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" }
    ],
    audio: audioRegistry.game
  }
};

type SceneName = keyof typeof sceneRegistry;
type BackgroundEntry =
  | { type: "image"; src: string; backgroundSize?: string }
  | { type: "overlay" };

type SceneEntry = {
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

  function push(name: SceneName, params?: Record<string, any>) {
    setStack(prev => [...prev, { name, params }]);
  }

  function pop() {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  function replace(name: SceneName, params?: Record<string, any>) {
    setStack(prev => [...prev.slice(0, -1), { name, params }]);
  }

  function reset(name: SceneName, params?: Record<string, any>) {
    setStack([{ name, params }]);
  }

  const current = stack[stack.length - 1];
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

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used inside <SceneManager>");
  return ctx;
}

/* =================== BackgroundManager =================== */
export function BackgroundManager({ scene }: { scene: SceneEntry }) {
  const layers = useMemo(() => {
    return {
      images: (sceneRegistry[scene.name].background || []).filter(
        bg => bg.type === "image"
      ),
      overlays: (sceneRegistry[scene.name].background || []).filter(
        bg => bg.type === "overlay"
      ),
    };
  }, [scene]);

  return (
    <>
      {layers.images.map((bg, i) => (
        <div
          key={`image-${scene.name}-${i}`}
          className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none select-none"
          style={{
            backgroundImage: `url(${(bg as any).src})`,
            ...(bg.backgroundSize ? { backgroundSize: bg.backgroundSize } : {})
          }}
        />
      ))}

      {layers.overlays.map((bg, i) => (
        <div
          key={`overlay-${scene.name}-${i}`}
          className="theme-bg-curtain fixed inset-0 pointer-events-none select-none"
        />
      ))}
    </>
  );
}

/* =================== Page Component =================== */
function Page() {
  return (
    <div className="relative h-full w-full text-gray-50 bg-[#1a1a1b]">
      <SceneManager />
    </div>
  );
}

export default Page;
