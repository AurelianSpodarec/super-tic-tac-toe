'use client'

import { sceneManager } from "../SceneManager";

function SceneMenu() {
  return (
    <div>
      <div>
        SceneMenu
      </div>
      <button onClick={() => sceneManager.push("game")}>Start Game</button>
      <button onClick={() => sceneManager.push("test")}>Test</button>
    </div>
  );
}

export default SceneMenu
