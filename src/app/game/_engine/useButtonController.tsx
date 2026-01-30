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
    const onBack = () => {
      handleClick("back");
      return true;
    };

    const onSettings = () => {
      handleClick("settings");
      return true;
    };

    InputManager.on("back", onBack);
    InputManager.on("settings", onSettings);

    return () => {
      InputManager.off("back", onBack);
      InputManager.off("settings", onSettings);
    };
  }, [handleClick]);

  return { handleClick };
}

export default useButtonController
