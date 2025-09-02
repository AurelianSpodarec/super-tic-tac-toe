import { registerBackgroundRenderer } from "./core";

import BackgroundImage from "./_components/BackgroundImage";
import OverlayCurtain from "./_components/OverlayCurtain";

registerBackgroundRenderer("image", (item, key) => (
  <BackgroundImage key={key} src={item.src} backgroundSize={item.backgroundSize} />
));

registerBackgroundRenderer("overlay", (_, key) => (
  <OverlayCurtain key={key} variant="secondary" />
));

registerBackgroundRenderer("menuOverlay", (_, key) => (
  <OverlayCurtain key={key} variant="primary" />
));
