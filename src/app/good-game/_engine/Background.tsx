import { useEffect, useRef, useState } from "react";
import Overlay from "../_components/Overlay";
import { useSceneManager } from "./SceneManager";

interface BackgroundWrapperProps {
  children?: React.ReactNode;
  backgroundImage: string;
  audioSrc?: string;
  tryAutoplay?: boolean;
  autoPlayAudio?: boolean;
  className?: string;
}

function BackgroundWrapper({
  children,
  backgroundImage,
  audioSrc,
  tryAutoplay = false,
  autoPlayAudio = false,
  className = "",
}: BackgroundWrapperProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle optional autoplay after user interaction
  useEffect(() => {
    if (!tryAutoplay || !audioRef.current) return;

    const tryPlay = () => {
      audioRef.current?.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction...");
      });
      window.removeEventListener("click", tryPlay);
    };

    window.addEventListener("click", tryPlay);
    return () => window.removeEventListener("click", tryPlay);
  }, [tryAutoplay]);

  return (
    <div
      className={`h-full w-full overflow-y-auto overflow-x-hidden ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="auto"
          loop
          autoPlay={autoPlayAudio && !tryAutoplay}
        />
      )}
      <div className="relative h-full w-full z-10 flex flex-col items-center">
        {children}
      </div>
      <Overlay />
    </div>
  );
}

// ------------------------
// Background Variants
// ------------------------
const backgroundMap: Record<
  string,
  React.ComponentType<{ children?: React.ReactNode }>
> = {
  variantOne: (props) => (
    <BackgroundWrapper
      backgroundImage="/images/brick.svg"
      audioSrc="/audio/jazz-cafe-crowd.mp3"
      tryAutoplay
      className="theme-scene-menu bg-red-500"
      {...props}
    />
  ),
  variantTwo: (props) => (
    <BackgroundWrapper
      backgroundImage="/images/bollywood.jpg"
      audioSrc="/audio/ambient-mixkit-fun-jazz.mp3"
      autoPlayAudio
      className="bg-cover bg-no-repeat"
      {...props}
    />
  ),
};

// ------------------------
// Background Renderer with Fade
// ------------------------
export function BackgroundRenderer({
  backgroundKey,
  children,
}: {
  backgroundKey?: string;
  children?: React.ReactNode;
}) {
  const [prevKey, setPrevKey] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState(backgroundKey);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (backgroundKey && backgroundKey !== currentKey) {
      setPrevKey(currentKey);
      setCurrentKey(backgroundKey);
      setFade(true);

      const timer = setTimeout(() => {
        setPrevKey(null);
        setFade(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [backgroundKey, currentKey]);

  const PrevBackground = prevKey ? backgroundMap[prevKey] : null;
  const CurrentBackground = currentKey ? backgroundMap[currentKey] : null;

  return (
    <>
      {PrevBackground && (
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-500"
          style={{ opacity: fade ? 0 : 1 }}
        >
          <PrevBackground>{children}</PrevBackground>
        </div>
      )}
      {CurrentBackground && (
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-500"
          style={{ opacity: 1 }}
        >
          <CurrentBackground>{children}</CurrentBackground>
        </div>
      )}
    </>
  );
}

// ------------------------
// Scene Renderer
// ------------------------
function SceneRenderer() {
  const { currentScene, getScene } = useSceneManager();
  if (!currentScene) return null;

  const scene = getScene(currentScene);
  return (
    <BackgroundRenderer backgroundKey={scene?.backgroundKey}>{scene?.component}</BackgroundRenderer>
  );
}

export default SceneRenderer
