import { audioRegistry, sceneRegistry, sfxRegistry } from "./settings";

export { audioRegistry, sceneRegistry, sfxRegistry };

export type SceneName = keyof typeof sceneRegistry;
