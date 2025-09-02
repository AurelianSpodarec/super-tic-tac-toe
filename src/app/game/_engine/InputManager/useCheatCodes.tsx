'use client'

import { useEffect } from "react";
import { InputManager } from ".";

export function useCheatCodes(codes: Record<string, () => void>) {
  useEffect(() => {
    InputManager.start();
    
    for (const [code, cb] of Object.entries(codes)) InputManager.registerCheat(code, cb);
    return () => { for (const code of Object.keys(codes)) InputManager.unregisterCheat(code); };
  }, [codes]);
}
