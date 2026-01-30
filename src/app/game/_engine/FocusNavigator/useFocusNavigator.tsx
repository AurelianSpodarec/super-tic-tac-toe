import { useCallback, useEffect, useReducer, useRef } from "react";

import { AudioManager } from "../AudioManager";
import { InputManager } from "../InputManager";
import { sfxRegistry } from "../settings";
import type { SceneName } from "../sceneRegistry";
import useScene from "../SceneManager/useScene";

import { getNextIndex } from "./navigation";

export interface MenuItem {
  id?: string;
  text: string;
  scene?: SceneName;
  params?: Record<string, unknown>;
  description?: string;
  thumbnail?: string;
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

type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

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

interface UseFocusNavigatorProps {
  items: MenuItem[];
  columns?: number;       // grid columns
  columnsMobile?: number; // mobile columns
  rows?: number;          // optional fixed rows
  direction?: "horizontal" | "vertical";
  onSelect?: (item: MenuItem) => void;
}

export default function useFocusNavigator({
  items,
  columns = 3,
  columnsMobile = 1,
  rows,
  direction = "horizontal",
  onSelect,
}: UseFocusNavigatorProps): MenuController {
  const { push } = useScene();

  const lastKey = useRef<string | null>(null);
  const navLockTime = useRef(0);
  const holdThreshold = 100;
  const holdDelay = 150;

  const [state, dispatch] = useReducer(menuReducer, {
    activeIndex: 0,
    turnedOn: new Set(items.map((_, i) => i)),
  });

  const setActive = useCallback((index: number) => {
    dispatch({ type: "SET_ACTIVE", index });
    AudioManager.playSFX(sfxRegistry.buttonNavigate);
  }, []);

  const toggleItem = useCallback((index: number) => {
    dispatch({ type: "TOGGLE_ITEM", index });
  }, []);

  const select = useCallback((index?: number) => {
    const idx = index ?? state.activeIndex;
    const item = items[idx];
    AudioManager.playSFX(sfxRegistry.buttonConfirm);

    if (item.scene) push(item.scene, item.params);
    if (item.action) item.action();
    onSelect?.(item);
  }, [items, onSelect, push, state.activeIndex]);

  const getColumns = useCallback(() => {
    return window.innerWidth < 768 ? columnsMobile : columns;
  }, [columns, columnsMobile]);

  const getRows = useCallback(() => {
    return rows ?? Math.ceil(items.length / getColumns());
  }, [getColumns, items.length, rows]);

  const handleArrowNavigation = useCallback((key: ArrowKey) => {
    const now = performance.now();

    // reset lock if new key or fast tap
    if (lastKey.current !== key || now - navLockTime.current > holdThreshold) {
      lastKey.current = key;
      navLockTime.current = 0;
    }

    // if still locked for hold, skip move
    if (navLockTime.current && now - navLockTime.current < holdDelay) return false;

    const cols = getColumns();
    const rowsToUse = getRows();

    const newIndex = getNextIndex({
      key,
      activeIndex: state.activeIndex,
      itemCount: items.length,
      columns: cols,
      rows: rowsToUse,
      direction,
    });

    if (newIndex !== state.activeIndex) setActive(newIndex);

    // start lock for repeated moves
    navLockTime.current = now;

    return true;
  }, [direction, getColumns, getRows, items.length, setActive, state.activeIndex]);

  useEffect(() => {
    const onUp = () => {
      handleArrowNavigation("ArrowUp");
      return true;
    };
    const onDown = () => {
      handleArrowNavigation("ArrowDown");
      return true;
    };
    const onLeft = () => {
      handleArrowNavigation("ArrowLeft");
      return true;
    };
    const onRight = () => {
      handleArrowNavigation("ArrowRight");
      return true;
    };
    const onEnter = () => {
      select();
      return true;
    };

    InputManager.on("up", onUp);
    InputManager.on("down", onDown);
    InputManager.on("left", onLeft);
    InputManager.on("right", onRight);
    InputManager.on("enter", onEnter);

    return () => {
      InputManager.off("up", onUp);
      InputManager.off("down", onDown);
      InputManager.off("left", onLeft);
      InputManager.off("right", onRight);
      InputManager.off("enter", onEnter);
    };
  }, [handleArrowNavigation, select]);

  const menuItems: MenuItemState[] = items.map((item, index) => ({
    ...item,
    active: index === state.activeIndex,
    turnedOn: state.turnedOn.has(index),
  }));

  return { items: menuItems, activeIndex: state.activeIndex, setActive, toggleItem, select };
}
