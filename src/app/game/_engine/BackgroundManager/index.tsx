import { SceneEntry } from "../SceneManager";
import { sceneRegistry } from "../settings";
import BackgroundImage from "./_components/BackgroundImage";
import { OverlayCurtain } from "./_components/OverlayCurtain";

function BackgroundManager({ scene }: { scene: SceneEntry }) {
  const backgrounds = sceneRegistry[scene.name].background || [];

  const images = backgrounds.filter(bg => bg.type === "image");
  const overlays = backgrounds.filter(bg => bg.type === "overlay");
  const menuOverlays = backgrounds.filter(bg => bg.type === "menuOverlay");

  return (
    <>
      {images.map((bg, index) => (
        <BackgroundImage key={`background-image-${scene.name}-${index}`} src={(bg as any).src} backgroundSize={(bg as any).backgroundSize} />
      ))}

      {overlays.map((_, index) => (
        <OverlayCurtain key={`overlay-${scene.name}-${index}`} variant="secondary" />
      ))}

      {menuOverlays.map((_, index) => (
        <OverlayCurtain key={`menuOverlay-${scene.name}-${index}`} variant="primary" />
      ))}
    </>
  );
}

export default BackgroundManager;
