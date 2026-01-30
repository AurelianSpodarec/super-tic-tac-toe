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

type BackgroundLayer =
  | { type: "image"; src: string }
  | { type: "menuOverlay" }
  | { type: "overlay" };

interface Scene {
  component: React.ComponentType;
  background: BackgroundLayer[];
  audio: typeof audioRegistry[keyof typeof audioRegistry];
}

export const sceneRegistry: Record<string, Scene> = {
  Home: {
    component: SceneStart,
    background: [
      { type: "image", src: "/images/brick-wall.webp" },
      { type: "menuOverlay" },
    ],
    audio: audioRegistry.home,
  },
  GameModes: {
    component: SceneGameModes,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
  Online: {
    component: SceneOnline,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
  Lobby: {
    component: SceneLobby,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
  Game: {
    component: SceneGameTicTacToe,
    background: [
      { type: "image", src: "/images/black-vintage-background.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.game,
  },
  Leaderboard: {
    component: SceneLeaderboard,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
  Credits: {
    component: SceneCredits,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
  Settings: {
    component: SceneSettings,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" },
    ],
    audio: audioRegistry.home,
  },
};
