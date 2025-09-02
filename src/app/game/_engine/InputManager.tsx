'use client'

import { useEffect, useState } from "react";

type Action =
  | "up" | "down" | "left" | "right"
  | "enter" | "tab" | "space"
  | "back" // 👈 add this
  | `cheat:${string}`;


class InputManagerClass {
  private actionListeners: Map<Action, Set<() => void>> = new Map();
  private typedBuffer: string[] = [];
  private cheatCodes: Map<string, () => void> = new Map();

  private trigger(action: Action) {
    this.actionListeners.get(action)?.forEach((cb) => cb());
  }

  on(action: Action, cb: () => void) {
    if (!this.actionListeners.has(action)) this.actionListeners.set(action, new Set());
    this.actionListeners.get(action)!.add(cb);
  }

  off(action: Action, cb: () => void) {
    this.actionListeners.get(action)?.delete(cb);
  }

  registerCheat(code: string, cb: () => void) {
    this.cheatCodes.set(code.toLowerCase(), () => {
      cb();
      this.trigger(`cheat:${code.toLowerCase()}` as Action);
    });
  }

  unregisterCheat(code: string) {
    this.cheatCodes.delete(code.toLowerCase());
  }

  private checkCheatCodes() {
    const bufferStr = this.typedBuffer.join("");
    for (const [code, cb] of this.cheatCodes) {
      if (bufferStr.endsWith(code)) {
        cb();
        this.typedBuffer = [];
      }
    }
  }

private handleKey = (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowUp": this.trigger("up"); break;
    case "ArrowDown": this.trigger("down"); break;
    case "ArrowLeft": this.trigger("left"); break;
    case "ArrowRight": this.trigger("right"); break;
    case "Enter": this.trigger("enter"); break;
    case "Tab": e.preventDefault(); this.trigger("tab"); break;
    case " ": this.trigger("space"); break;
    case "Backspace":
    case "Escape":
      this.trigger("back"); break; // ✅ global back
    default:
      if (/^[a-z0-9]$/i.test(e.key)) {
        this.typedBuffer.push(e.key.toLowerCase());
        if (this.typedBuffer.length > 50) this.typedBuffer.shift();
        this.checkCheatCodes();
      }
  }
};


  start() { window.addEventListener("keydown", this.handleKey); }
  stop() {
    window.removeEventListener("keydown", this.handleKey);
    this.actionListeners.clear();
    this.cheatCodes.clear();
    this.typedBuffer = [];
  }
}

export const InputManager = new InputManagerClass();

/* ---------------------- Hooks ---------------------- */

export function useInput(action: Action): boolean {
  const [active, setActive] = useState(false);
  useEffect(() => {
    InputManager.start();
    const handler = () => { setActive(true); requestAnimationFrame(() => setActive(false)); };
    InputManager.on(action, handler);
    return () => InputManager.off(action, handler);
  }, [action]);
  return active;
}

export function useCheatCodes(codes: Record<string, () => void>) {
  useEffect(() => {
    InputManager.start();
    for (const [code, cb] of Object.entries(codes)) InputManager.registerCheat(code, cb);
    return () => { for (const code of Object.keys(codes)) InputManager.unregisterCheat(code); };
  }, [codes]);
}