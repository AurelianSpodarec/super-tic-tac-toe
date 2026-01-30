import type { ComponentType } from "react";
import type { Background } from "./BackgroundManager/core";

import SceneStart from "../_scenes/Start";
import SceneGameModes from "../_scenes/GameModes";
import SceneOnline from "../_scenes/Online";
import SceneLobby from "../_scenes/Lobby";
import SceneGameTicTacToe from "../_scenes/TicTacToe";
import SceneCredits from "../_scenes/Credits";
import SceneLeaderboard from "../_scenes/Leaderboard";
import SceneSettings from "../_scenes/Settings";

export const audioRegistry = {
  home: "audio/relaxing-jazz-saxophone.mp3",
  game: "audio/ambient-mixkit-jazz-1.mp3",
} as const;

export const sfxRegistry = {
  buttonNavigate: "/audio/rimshot-sweet.mp3",
  buttonConfirm: "/audio/spacebar-click-keyboard.mp3",
} as const;

type BackgroundLayer = Extract<Background, { type: "image" | "menuOverlay" | "overlay" }>;

type ScenePresentation = "screen" | "modal";

type ActionBarConfig = {
  showBack?: boolean;
  showSettings?: boolean;
  showFullscreen?: boolean;
};

const defaultActionBar: ActionBarConfig = {};

interface Scene {
  component: ComponentType;
  background: BackgroundLayer[];
  audio: typeof audioRegistry[keyof typeof audioRegistry];
  presentation?: ScenePresentation;
  actionBar?: ActionBarConfig;
}

export const sceneRegistry = {
  Home: {
    component: SceneStart,
    background: [
      { type: "image", src: "/images/brick-wall.webp" },
      { type: "menuOverlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: { showBack: false } as ActionBarConfig,
  },
  GameModes: {
    component: SceneGameModes,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Online: {
    component: SceneOnline,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Lobby: {
    component: SceneLobby,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Game: {
    component: SceneGameTicTacToe,
    background: [
      { type: "image", src: "/images/black-vintage-background.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.game,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Leaderboard: {
    component: SceneLeaderboard,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Credits: {
    component: SceneCredits,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "screen",
    actionBar: defaultActionBar,
  },
  Settings: {
    component: SceneSettings,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
    presentation: "modal",
    actionBar: {
      showBack: false,
      showSettings: false,
      showFullscreen: false,
    },
  },
} satisfies Record<string, Scene>;
