import SceneStart from "../_scenes/Start";
import SceneGameModes from "../_scenes/GameModes";
import SceneGameTicTacToe from "../_scenes/TicTacToe";

export const audioRegistry = {
  home: "audio/relaxing-jazz-saxophone.mp3",
  game: "audio/ambient-mixkit-jazz-1.mp3"
};

export const sceneRegistry = {
  Home: {
    component: SceneStart,
    background: [
      { type: "image", src: "/images/brick-wall.webp" },
      { type: "menuOverlay" }
    ],
    audio: audioRegistry.home
  },
  GameModes: {
    component: SceneGameModes,
    background: [
      { type: "image", src: "/images/music-bg.jpg" },
      { type: "overlay" }
    ],
    audio: audioRegistry.home
  },
  Game: {
    component: SceneGameTicTacToe,
    background: [
      { type: "image", src: "/images/black-vintage-background.jpg" },
      { type: "overlay" }
    ],
    audio: audioRegistry.game
  }
};
