import { useReducer, useEffect } from "react";
import { AudioManager } from "./AudioManager";
import { useScene } from "./SceneManager";
import { sfxRegistry } from "./settings";

import type { SceneName } from "./SceneManager";

export interface MenuItem {
  id?: string;
  text: string;
  scene?: SceneName;
  action?: () => void;
}

export interface MenuItemState extends MenuItem {
  active: boolean;
  turnedOn: boolean;
}

export interface MenuController {
  items: MenuItemState[];
  activeIndex: number;
  setActive: (index: number) => void;
  toggleItem: (index: number) => void;
  select: (index?: number) => void;
}

interface MenuState {
  activeIndex: number;
  turnedOn: Set<number>;
}

type MenuAction =
  | { type: "SET_ACTIVE"; index: number }
  | { type: "TOGGLE_ITEM"; index: number };

function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "SET_ACTIVE":
      return { ...state, activeIndex: action.index };
    case "TOGGLE_ITEM": {
      const turnedOn = new Set(state.turnedOn);
      if (turnedOn.has(action.index)) turnedOn.delete(action.index);
      else turnedOn.add(action.index);
      return { ...state, turnedOn };
    }
    default:
      return state;
  }
}

export function useMenuController(
  items: MenuItem[],
  onSelect?: (item: MenuItem) => void,
  direction: "vertical" | "horizontal" = "vertical"
): MenuController {
  const { push } = useScene();

  const [state, dispatch] = useReducer(menuReducer, {
    activeIndex: 0,
    turnedOn: new Set(items.map((_, i) => i)),
  });

  const setActive = (index: number) => {
    dispatch({ type: "SET_ACTIVE", index });
    AudioManager.playSFX(sfxRegistry.buttonNavigate);
  };

  const toggleItem = (index: number) => {
    dispatch({ type: "TOGGLE_ITEM", index });
  };

  const select = (index?: number) => {
    const idx = index ?? state.activeIndex;
    const item = items[idx];
    AudioManager.playSFX(sfxRegistry.buttonConfirm);

    if (item.scene) push(item.scene);
    if (item.action) item.action();
    onSelect?.(item);
  };

  const handleArrowNavigation = (key: string) => {
    let nextIndex = state.activeIndex;

    if (direction === "vertical") {
      if (key === "ArrowDown") nextIndex = (state.activeIndex + 1) % items.length;
      if (key === "ArrowUp") nextIndex = (state.activeIndex - 1 + items.length) % items.length;
    } else {
      if (key === "ArrowRight") nextIndex = (state.activeIndex + 1) % items.length;
      if (key === "ArrowLeft") nextIndex = (state.activeIndex - 1 + items.length) % items.length;
    }

    if (nextIndex !== state.activeIndex) {
      setActive(nextIndex);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let handled = handleArrowNavigation(e.key);

      if (e.key === "Enter") {
        select();
        handled = true;
      }

      if (e.key === "Backspace") {
        handled = true; // Optional: handle back navigation
      }

      if (handled) e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.activeIndex, direction, items.length]); // no callbacks, use direct values

  const menuItems: MenuItemState[] = items.map((item, index) => ({
    ...item,
    active: index === state.activeIndex,
    turnedOn: state.turnedOn.has(index),
  }));

  return { items: menuItems, activeIndex: state.activeIndex, setActive, toggleItem, select };
}
