'use client'

import { sceneManager } from "../SceneManager";
import SceneGame from "./Game";
import SceneMenu from "./Menu";
import SceneTest from "./Test";

// sceneManager.register({ key: "menu", component: SceneMenu, transitionType: "fade", transitionDuration: 1000 });
sceneManager.register({
  key: "menu",
  component: SceneMenu,
  transitionType: "fade",
  backgroundKey: "menuGroup",
  preload: async () => {
    // await new Promise(res => setTimeout(res, 500)); // simulate asset loading
  },
});

sceneManager.register({ key: "test", backgroundKey: "menuGroup",component: SceneTest, transitionType: "fade", transitionDuration: 300 });
sceneManager.register({ key: "game", backgroundKey: "menuGroup",component: SceneGame, transitionType: "fade", transitionDuration: 300 });

sceneManager.start("menu");
