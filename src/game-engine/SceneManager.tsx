import { EventEmitter } from "events";
import React from "react";

export interface SceneConfig {
  key: string;
  component: React.ComponentType<any>;
  transitionType?: "fade" | "slideLeft" | "slideRight" | "scale";
  transitionDuration?: number; // ms
}

export class SceneManager extends EventEmitter {
  private scenes: Record<string, SceneConfig> = {};
  private stack: string[] = [];

  register(scene: SceneConfig) {
    this.scenes[scene.key] = scene;
  }

  start(key: string) {
    if (!this.scenes[key]) throw new Error(`Scene "${key}" not registered`);
    this.stack = [key];
    this.emit("sceneChange", this.getCurrentScene());
  }

  push(key: string) {
    if (!this.scenes[key]) throw new Error(`Scene "${key}" not registered`);
    this.stack.push(key);
    this.emit("sceneChange", this.getCurrentScene());
  }

  back() {
    if (this.stack.length <= 1) return;
    this.stack.pop();
    this.emit("sceneChange", this.getCurrentScene());
  }

  getCurrentScene(): SceneConfig | null {
    const key = this.stack[this.stack.length - 1];
    return key ? this.scenes[key] : null;
  }
}

// singleton instance
export const sceneManager = new SceneManager();
