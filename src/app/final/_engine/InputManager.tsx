type InputCallback = (event: KeyboardEvent) => void;

class InputManagerClass {
  private listeners: Set<InputCallback> = new Set();

  addListener(cb: InputCallback) { this.listeners.add(cb); }
  removeListener(cb: InputCallback) { this.listeners.delete(cb); }

  handleEvent = (event: KeyboardEvent) => {
    this.listeners.forEach(cb => cb(event));
  };

  start() { window.addEventListener("keydown", this.handleEvent); }
  stop() { window.removeEventListener("keydown", this.handleEvent); this.listeners.clear(); }
}

export const InputManager = new InputManagerClass();
