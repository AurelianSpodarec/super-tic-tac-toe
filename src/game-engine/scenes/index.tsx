'use client'

import { sceneManager } from "../SceneManager";
import SceneGame from "./Game";
import SceneMenu from "./Menu";
import SceneTest from "./Test";

sceneManager.register({ key: "menu", component: SceneMenu, transitionType: "fade" });
sceneManager.register({ key: "test", component: SceneTest, transitionType: "fade", transitionDuration: 500 });
sceneManager.register({ key: "game", component: SceneGame, transitionType: "scale", transitionDuration: 600 });

sceneManager.start("menu");
