'use client'

import React, { useState, createContext, useContext, useMemo, useEffect } from "react";

import SceneStart from "./_scenes/Start";
import SceneGameModes from "./_scenes/GameModes";
import SceneGameTicTacToe from "./_scenes/TicTacToe";
import ActionBar from "./_components/ActionBar";

const audioRegistry = {
  home: "audio/relaxing-jazz-saxophone.mp3",
  game: "audio/jazz-cafe-crowd.mp3"
};

/* ================= AudioManager ================= */
/* ================= AudioManager ================= */
/* ================= AudioManager ================= */
/* ================= AudioManager ================= */
class AudioManagerClass {
  public audioElements: Record<string, HTMLAudioElement> = {};
  private currentAudio?: HTMLAudioElement;
  private currentSrc?: string;
  private unlocked = false;
  private queuedSrc?: string;
  private fadeDuration = 1000; // ms

  constructor() {
    // Unlock audio on first user gesture
    const unlock = () => {
      this.unlocked = true;
      document.body.removeEventListener("click", unlock);
      document.body.removeEventListener("keydown", unlock);
      if (this.queuedSrc) this.play(this.queuedSrc);
    };
    document.body.addEventListener("click", unlock, { once: true });
    document.body.addEventListener("keydown", unlock, { once: true });
  }

  preload(src: string) {
    if (!this.audioElements[src]) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      this.audioElements[src] = audio;
    }
  }

  async play(src: string) {
    if (!this.unlocked) {
      this.queuedSrc = src;
      return;
    }

    // If same audio already playing, do nothing
    if (this.currentSrc === src && this.currentAudio) return;

    const newAudio = this.audioElements[src];
    if (!newAudio) return;

    const oldAudio = this.currentAudio;
    this.currentAudio = newAudio;
    this.currentSrc = src;

    // Start new audio at 0 volume
    newAudio.currentTime = 0;
    newAudio.play().catch(() => {});

    // Crossfade
    await this.crossfade(oldAudio, newAudio);
  }

  private crossfade(oldAudio?: HTMLAudioElement, newAudio?: HTMLAudioElement) {
    return new Promise<void>(resolve => {
      const step = 50;
      const steps = this.fadeDuration / step;
      let count = 0;

      const fadeInterval = setInterval(() => {
        count++;

        if (newAudio) {
          newAudio.volume = Math.min(count / steps, 1);
        }

        if (oldAudio) {
          oldAudio.volume = Math.max(1 - count / steps, 0);
          if (oldAudio.volume === 0) oldAudio.pause();
        }

        if (count >= steps) {
          clearInterval(fadeInterval);
          if (newAudio) newAudio.volume = 1;
          resolve();
        }
      }, step);
    });
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = undefined;
      this.currentSrc = undefined;
    }
  }
}

export const AudioManager = new AudioManagerClass();


/* ================= InputManager ================= */
type InputCallback = (event: KeyboardEvent) => void;

class InputManagerClass {
  private listeners: Set<InputCallback> = new Set();

  addListener(cb: InputCallback) {
    this.listeners.add(cb);
  }

  removeListener(cb: InputCallback) {
    this.listeners.delete(cb);
  }

  handleEvent = (event: KeyboardEvent) => {
    this.listeners.forEach(cb => cb(event));
  };

  start() {
    window.addEventListener("keydown", this.handleEvent);
  }

  stop() {
    window.removeEventListener("keydown", this.handleEvent);
    this.listeners.clear();
  }
}

export const InputManager = new InputManagerClass();

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
  const current = stack[stack.length - 1];
  const previousRef = React.useRef<SceneEntry | null>(null);

  // Preload all scene audio on mount
  useEffect(() => {
    Object.values(sceneRegistry).forEach(scene => {
      AudioManager.preload(scene.audio);
    });
  }, []);

  // Play audio on scene change
  useEffect(() => {
    if (!current) return;

    const prev = previousRef.current;
    previousRef.current = current;

    const newAudio = sceneRegistry[current.name].audio;
    const prevAudio = prev ? sceneRegistry[prev.name].audio : null;

    // If same audio, do nothing
    if (prevAudio === newAudio) return;

    // Play new audio with fade in/out
    AudioManager.play(newAudio);
  }, [current.name]);

  // Start input manager
  useEffect(() => {
    InputManager.start();
    return () => InputManager.stop();
  }, []);

  function push(name: SceneName, params?: Record<string, any>) {
    setStack(prev => [...prev, { name, params }]);
  }

  async function pop() {
    setStack(prev => {
      if (prev.length <= 1) return prev;

      const newStack = prev.slice(0, -1);
      const newScene = newStack[newStack.length - 1];
      const currentScene = prev[prev.length - 1];

      // Fade audio to previous scene
      const newAudio = sceneRegistry[newScene.name].audio;
      const currentAudio = sceneRegistry[currentScene.name].audio;

      if (currentAudio !== newAudio) {
        AudioManager.play(newAudio);
      }

      return newStack;
    });
  }

  function replace(name: SceneName, params?: Record<string, any>) {
    setStack(prev => {
      const newStack = [...prev.slice(0, -1), { name, params }];
      const newAudio = sceneRegistry[name].audio;
      const prevAudio = prev[prev.length - 1].name
        ? sceneRegistry[prev[prev.length - 1].name].audio
        : null;

      if (newAudio !== prevAudio) {
        AudioManager.play(newAudio);
      }

      return newStack;
    });
  }

  function reset(name: SceneName, params?: Record<string, any>) {
    setStack([{ name, params }]);
    AudioManager.play(sceneRegistry[name].audio);
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
