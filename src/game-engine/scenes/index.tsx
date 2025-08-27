'use client'

import { sceneManager } from "../SceneManager";
import SceneGame from "./Game";
import SceneMenu from "./Menu";
import SceneTest from "./Test";

sceneManager.register({ key: "menu", component: SceneMenu, transitionType: "fade", transitionDuration: 1000 });
sceneManager.register({ key: "test", component: SceneTest, transitionType: "fade", transitionDuration: 300 });
sceneManager.register({ key: "game", component: SceneGame, transitionType: "fade", transitionDuration: 300 });

sceneManager.start("menu");
