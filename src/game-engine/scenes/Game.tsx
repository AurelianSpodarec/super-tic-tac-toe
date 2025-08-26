'use client'

import { sceneManager } from "../SceneManager";

function SceneGame() {
  return (
    <div>
      <button onClick={() => sceneManager.back()}>Back</button>
      <div>
        SceneGame
      </div>
    </div>
  );
}

export default SceneGame
