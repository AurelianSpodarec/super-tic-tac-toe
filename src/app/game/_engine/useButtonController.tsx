import { useCallback, useEffect } from "react";

import { AudioManager } from "./AudioManager";
import { InputManager } from "./InputManager";
import { MenuItem } from "./FocusNavigator/useFocusNavigator";
import { sfxRegistry } from "./settings";

function useButtonController(buttons: MenuItem[]) {

  function playClickSound() {
    AudioManager.playSFX(sfxRegistry.buttonConfirm);
  }

  const handleClick = useCallback((id: string) => {
    const button = buttons.find((buttonItem) => buttonItem.id === id);
    if (!button) return;

    playClickSound();
    button.action?.();
  }, [buttons]);

  // Optional: handle keyboard mappings for global buttons (via InputManager)
  useEffect(() => {
    // Only bind shortcuts that are not already handled globally.
    // Back/Escape is handled by SceneManager to avoid duplicate pops.
    const onSettings = () => {
      handleClick("settings");
      return true;
    };

    InputManager.on("settings", onSettings);

    return () => {
      InputManager.off("settings", onSettings);
    };
  }, [handleClick]);

  return { handleClick };
}

export default useButtonController
