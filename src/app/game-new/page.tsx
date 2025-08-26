'use client'

import { SceneTransitionManager } from "@/game-engine/SceneTransition";
import "./../../game-engine/scenes/index"

export default function App() {

  return (
    <div className="w-full h-full">
      <SceneTransitionManager />
    </div>
  );
}
