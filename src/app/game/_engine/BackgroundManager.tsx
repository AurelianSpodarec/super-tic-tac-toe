import { SceneEntry } from "./SceneManager";
import { sceneRegistry } from "./settings";

function BackgroundManager({ scene }: { scene: SceneEntry }) {
  // Compute layers directly
  const images = (sceneRegistry[scene.name].background || []).filter(bg => bg.type === "image");
  const overlays = (sceneRegistry[scene.name].background || []).filter(bg => bg.type === "overlay");
  const menuOverlays = (sceneRegistry[scene.name].background || []).filter(bg => bg.type === "menuOverlay");

  return (
    <>
      {images.map((bg, i) => (
        <div
          key={`image-${scene.name}-${i}`}
          className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none select-none"
          style={{
            backgroundImage: `url(${(bg as any).src})`,
            ...(bg.backgroundSize ? { backgroundSize: bg.backgroundSize } : {})
          }}
        />
      ))}
      {overlays.map((bg, i) => (
        <div
          key={`overlay-${scene.name}-${i}`}
          className="theme-bg-curtain fixed inset-0 pointer-events-none select-none"
        />
      ))}
       {menuOverlays.map((bg, i) => (
        <div
          key={`overlay-${scene.name}-${i}`}
          className="theme-bg-menu-curtain fixed inset-0 pointer-events-none select-none"
        />
      ))}
    </>
  );
}

export default BackgroundManager
