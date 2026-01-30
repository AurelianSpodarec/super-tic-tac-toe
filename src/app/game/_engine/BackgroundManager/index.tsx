import type { SceneEntry } from "../navigation/types";
import { sceneRegistry } from "../settings";
import type { Background } from "./core";
import { backgroundRenderers } from "./registry";

function BackgroundManager({ scene }: { scene: SceneEntry }) {
  const backgrounds: Background[] = sceneRegistry[scene.name]?.background || [];

  return (
    <>
      {backgrounds.map((bg, index) => {
        const key = `${bg.type}-${scene.name}-${index}`;
        const renderer = backgroundRenderers[bg.type];
        if (!renderer) return null;
        return renderer(bg, key);
      })}
    </>
  );
}

export default BackgroundManager;
