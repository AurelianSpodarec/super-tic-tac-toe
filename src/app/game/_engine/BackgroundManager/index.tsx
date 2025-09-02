import "./registry"

import type { SceneEntry } from "../SceneManager";
import { sceneRegistry } from "../settings";
import { Background, getBackgroundRenderer } from "./core";

function BackgroundManager({ scene }: { scene: SceneEntry }) {
  const backgrounds: Background[] = sceneRegistry[scene.name]?.background || [];

  return (
    <>
      {backgrounds.map((bg, index) => {
        const key = `${bg.type}-${scene.name}-${index}`;
        const renderer = getBackgroundRenderer(bg.type);
        if (!renderer) return null;
        return renderer(bg, key);
      })}
    </>
  );
}

export default BackgroundManager;
