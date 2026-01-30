import type React from "react";

export type Background =
  | { type: "image"; src: string; backgroundSize?: string }
  | { type: "overlay" }
  | { type: "menuOverlay" };

export type BackgroundRenderer<T extends Background = Background> = (
  bg: T,
  key: string
) => React.ReactNode | null;
