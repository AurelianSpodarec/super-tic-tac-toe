export type Screen =
  | { type: "menu" }
  | { type: "submenu"; submenuId: string; options?: string[] }
  | { type: "game"; modeId: string };

export type Direction = "leftToCenter" | "bottomToTop";
