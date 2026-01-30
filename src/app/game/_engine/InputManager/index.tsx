'use client'

export type Action =
  | "up" | "down" | "left" | "right"
  | "enter" | "tab" | "space"
  | "back"
  | "settings"
  | `cheat:${string}`;

type ActionHandler = (e: KeyboardEvent) => boolean | void;

class InputManagerClass {
  private actionListeners: Map<Action, Set<ActionHandler>> = new Map();
  private typedBuffer: string[] = [];
  private cheatCodes: Map<string, () => void> = new Map();

  private trigger(action: Action, e: KeyboardEvent): boolean {
    let handled = false;
    this.actionListeners.get(action)?.forEach((cb) => {
      try {
        if (cb(e) === true) handled = true;
      } catch {
        // ignore listener failures
      }
    });
    return handled;
  }

  on(action: Action, cb: ActionHandler) {
    if (!this.actionListeners.has(action)) this.actionListeners.set(action, new Set());
    this.actionListeners.get(action)!.add(cb);
  }

  off(action: Action, cb: ActionHandler) {
    this.actionListeners.get(action)?.delete(cb);
  }

  registerCheat(code: string, cb: () => void) {
    this.cheatCodes.set(code.toLowerCase(), () => {
      cb();
      // Cheat events are just another InputManager action.
      this.trigger(`cheat:${code.toLowerCase()}` as Action, new KeyboardEvent("keydown"));
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
      case "ArrowUp":
        if (this.trigger("up", e)) e.preventDefault();
        break;
      case "ArrowDown":
        if (this.trigger("down", e)) e.preventDefault();
        break;
      case "ArrowLeft":
        if (this.trigger("left", e)) e.preventDefault();
        break;
      case "ArrowRight":
        if (this.trigger("right", e)) e.preventDefault();
        break;
      case "Enter":
        if (this.trigger("enter", e)) e.preventDefault();
        break;
      case "Tab":
        e.preventDefault();
        this.trigger("tab", e);
        break;
      case " ":
        if (this.trigger("space", e)) e.preventDefault();
        break;
      case "F1":
        if (this.trigger("settings", e)) e.preventDefault();
        break;
      case "Backspace":
      case "Escape":
        if (this.trigger("back", e)) e.preventDefault();
        break;
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          this.typedBuffer.push(e.key.toLowerCase());
          if (this.typedBuffer.length > 50) this.typedBuffer.shift();
          this.checkCheatCodes();
        }
    }
  };

  start() {
    window.addEventListener("keydown", this.handleKey);
  }

  stop() {
    window.removeEventListener("keydown", this.handleKey);
    this.actionListeners.clear();
    this.cheatCodes.clear();
    this.typedBuffer = [];
  }
}

export const InputManager = new InputManagerClass();
