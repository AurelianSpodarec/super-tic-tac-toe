import { useEffect } from "react";
import { AudioManager } from "./AudioManager";
import { MenuItem } from "./FocusNavigator/useFocusNavigator";
import { sfxRegistry } from "./settings";

function useButtonController(buttons: MenuItem[]) {

  function playClickSound() {
    AudioManager.playSFX(sfxRegistry.buttonConfirm);
  }

  function handleClick(id: string) {
    const button = buttons.find(buttonItem => buttonItem.id === id);
    if (!button) return;

    playClickSound();
    button.action?.();
  }

  // Optional: handle keyboard mappings for global buttons
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClick("back");
      }
      if (e.key === "F1") {
        handleClick("settings");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buttons]);

  return { handleClick };
}

export default useButtonController
