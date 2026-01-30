import type { Background, BackgroundRenderer } from "./core";

import BackgroundImage from "./_components/BackgroundImage";
import OverlayCurtain from "./_components/OverlayCurtain";

type ImageBackground = Extract<Background, { type: "image" }>;

const renderImage: BackgroundRenderer<ImageBackground> = (item, key) => (
  <BackgroundImage key={key} src={item.src} backgroundSize={item.backgroundSize} />
);

const renderOverlay: BackgroundRenderer<Extract<Background, { type: "overlay" }>> = (_, key) => (
  <OverlayCurtain key={key} variant="secondary" />
);

const renderMenuOverlay: BackgroundRenderer<Extract<Background, { type: "menuOverlay" }>> = (_, key) => (
  <OverlayCurtain key={key} variant="primary" />
);

export const backgroundRenderers = {
  image: renderImage as BackgroundRenderer,
  overlay: renderOverlay as BackgroundRenderer,
  menuOverlay: renderMenuOverlay as BackgroundRenderer,
} satisfies Record<Background["type"], BackgroundRenderer>;
