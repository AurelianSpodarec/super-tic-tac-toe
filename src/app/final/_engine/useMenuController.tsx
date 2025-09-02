import { useState, useEffect } from "react";
import { AudioManager } from "./AudioManager";
import { useScene } from "./SceneManager";

export interface MenuItem {
  text: string;
  scene: string;
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

export function useMenuController(
  items: MenuItem[],
  onSelect?: (item: MenuItem) => void,
  direction: "vertical" | "horizontal" = "vertical"
): MenuController {
  const [activeIndex, setActiveIndex] = useState(0);
  const [turnedOnItems, setTurnedOnItems] = useState<number[]>(
    items.map(function (_, i) { return i; })
  );

  const { push } = useScene()

  function playNavigationSound() {
    AudioManager.playSFX("/audio/rimshot-sweet.mp3");
  }

  function playEnterSound() {
    AudioManager.playSFX("/audio/spacebar-click-keyboard.mp3")
  }

  function setActive(index: number) {
    setActiveIndex(index);
    playNavigationSound();
  }

  // Toggle turned-on state
  function toggleItem(index: number) {
    setTurnedOnItems(function (prev) {
      return prev.includes(index)
        ? prev.filter(function (i) { return i !== index; })
        : prev.concat(index);
    });
  }

  function select(index?: number) {
    var idx = index ?? activeIndex;
    var item = items[idx];
    playEnterSound()
    push(item.scene);
    // onSelect?.(item);
  }

  // Keyboard navigation handler
  function handleArrowNavigation(key: string) {
    var nextIndex = activeIndex;
    if (direction === "vertical") {
      if (key === "ArrowDown") nextIndex = (activeIndex + 1) % items.length;
      if (key === "ArrowUp") nextIndex = (activeIndex - 1 + items.length) % items.length;
    } else {
      if (key === "ArrowRight") nextIndex = (activeIndex + 1) % items.length;
      if (key === "ArrowLeft") nextIndex = (activeIndex - 1 + items.length) % items.length;
    }

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
      playNavigationSound();
      return true;
    }
    return false;
  }

  useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      var handled = false;

      handled = handleArrowNavigation(e.key) || handled;

      if (e.key === "Enter") {
        select();
        handled = true;
      }

      if (e.key === "Backspace") {
        // Optional: pop scene
        handled = true;
      }

      if (handled) e.preventDefault();
    }

    window.addEventListener("keydown", handleKeyDown);
    return function () { window.removeEventListener("keydown", handleKeyDown); };
  }, [direction, activeIndex, items, onSelect]);

  // Compose menu items with state
  var menuItems: MenuItemState[] = items.map(function (item, index) {
    return {
      ...item,
      active: index === activeIndex,
      turnedOn: turnedOnItems.includes(index),
    };
  });

  return { items: menuItems, activeIndex, setActive, toggleItem, select };
}
