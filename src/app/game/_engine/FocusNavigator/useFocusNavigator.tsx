import { useReducer, useEffect, useRef } from "react";
import { AudioManager } from "../AudioManager";
import { sfxRegistry } from "../settings";
import useScene from "../SceneManager/useScene";

export interface MenuItem {
  id?: string;
  text: string;
  scene?: string;
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

  const getColumns = () => (window.innerWidth < 768 ? columnsMobile : columns);
  const getRows = () => rows ?? Math.ceil(items.length / getColumns());

  const handleArrowNavigation = (key: string) => {
    const now = performance.now();

    // reset lock if new key or fast tap
    if (lastKey.current !== key || now - navLockTime.current > holdThreshold) {
      lastKey.current = key;
      navLockTime.current = 0;
    }

    // if still locked for hold, skip move
    if (navLockTime.current && now - navLockTime.current < holdDelay) return false;

    // move logic
    const cols = getColumns();
    const rowsToUse = getRows();
    let row = Math.floor(state.activeIndex / cols);
    let col = state.activeIndex % cols;

    if (cols === 1 || direction === "vertical") {
      if (key === "ArrowUp") row = row - 1 >= 0 ? row - 1 : rowsToUse - 1;
      if (key === "ArrowDown") row = row + 1 < rowsToUse ? row + 1 : 0;
      col = 0;
    } else {
      if (key === "ArrowLeft") col = col - 1 >= 0 ? col - 1 : cols - 1;
      if (key === "ArrowRight") col = col + 1 < cols ? col + 1 : 0;
      if (key === "ArrowUp") row = row - 1 >= 0 ? row - 1 : rowsToUse - 1;
      if (key === "ArrowDown") row = row + 1 < rowsToUse ? row + 1 : 0;
    }

    const newIndex = Math.min(row * cols + col, items.length - 1);
    if (newIndex !== state.activeIndex) setActive(newIndex);

    // start lock for repeated moves
    navLockTime.current = now;

    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let handled = handleArrowNavigation(e.key);
      if (e.key === "Enter") {
        select();
        handled = true;
      }
      if (handled) e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.activeIndex, columns, columnsMobile, rows, direction, items.length]);

  const menuItems: MenuItemState[] = items.map((item, index) => ({
    ...item,
    active: index === state.activeIndex,
    turnedOn: state.turnedOn.has(index),
  }));

  return { items: menuItems, activeIndex: state.activeIndex, setActive, toggleItem, select };
}
