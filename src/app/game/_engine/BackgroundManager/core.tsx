import type React from "react";

export type Background =
  | { type: "image"; src: string; backgroundSize?: string }
  | { type: "overlay" }
  | { type: "menuOverlay" }
  | { type: string;[key: string]: unknown };

export type BackgroundRenderer<T extends Background = Background> = (
  bg: T,
  key: string
) => React.ReactNode | null;

const backgroundRenderers: Record<string, BackgroundRenderer> = {};

export function registerBackgroundRenderer<T extends Background["type"]>(type: T, renderer: BackgroundRenderer<Extract<Background, { type: T }>>) {
  backgroundRenderers[type] = renderer as BackgroundRenderer;
}

export function getBackgroundRenderer(type: string) {
  return backgroundRenderers[type];
}
