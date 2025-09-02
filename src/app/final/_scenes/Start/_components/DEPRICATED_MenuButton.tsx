import { useEffect } from "react";
import { useScene } from "../_engine/SceneManager";

type MenuButtonProps = {
  text: string;
  turnedOn: boolean;
  isActive: boolean;
  onMouseEnter?: () => void;
  targetScene?: "Home" | "Game" | "GameModes"; // limit to registered scenes
};

function MenuButton({ text, turnedOn, isActive, onMouseEnter, targetScene, handleSelect }: MenuButtonProps) {
  const { push } = useScene();

  
  return (
    <button
      type="button"
      className={`
        font-neontubes
        text-[clamp(1.5rem,2.5vw,2rem)] outline-none transition-all duration-200
        ${turnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"} 
        ${isActive && turnedOn ? "active-item neon2 scale-105" : ""}
      `}
      onMouseEnter={onMouseEnter}
      onClick={handleSelect}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${text}${isActive ? " (active)" : ""}`}
      >
      {text}
    </button>
  );
}

export default MenuButton

// useEffect(() => {
//   if (isActive) {
//     const hoverSound = new Audio("/audio/rimshot-sweet.mp3");
//     hoverSound.play();
//   }
// }, [isActive]);

// function handleSelect() {
//   const selectSound = new Audio("/audio/jazzysnap.mp3");
//   selectSound.play();

//   if (targetScene) {
//     push(targetScene);
//   }
// }