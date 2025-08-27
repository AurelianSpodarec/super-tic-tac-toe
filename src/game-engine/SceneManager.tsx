import { EventEmitter } from "events";
import React from "react";

export interface SceneConfig {
  key: string;
  component: React.ComponentType<any>;
  transitionType?: "fade" | "slideLeft" | "slideRight" | "scale";
  transitionDuration?: number; // ms
  preload?: () => Promise<void>; // optional preload
  backgroundKey?: string; // identifies shared background
  backgroundImage?: string; // optional direct image url
}

export class SceneManager extends EventEmitter {
  private scenes: Record<string, SceneConfig> = {};
  private stack: string[] = [];

  register(scene: SceneConfig) {
    this.scenes[scene.key] = scene;
  }

  async start(key: string) {
    if (!this.scenes[key]) throw new Error(`Scene "${key}" not registered`);

    const scene = this.scenes[key];
    this.stack = [key];

    // preload scene if defined
    if (scene.preload) await scene.preload();

    this.emit("sceneChange", this.getCurrentScene());
  }

  async push(key: string) {
    if (!this.scenes[key]) throw new Error(`Scene "${key}" not registered`);

    const scene = this.scenes[key];
    this.stack.push(key);

    if (scene.preload) await scene.preload();

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
