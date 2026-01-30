'use client'

import { useEffect, useState } from "react";
import { Action, InputManager } from ".";

export function useInput(action: Action): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = () => {
      setActive(true);
      requestAnimationFrame(() => setActive(false));
      return false;
    };

    InputManager.on(action, handler);
    return () => InputManager.off(action, handler);
  }, [action]);

  return active;
}
