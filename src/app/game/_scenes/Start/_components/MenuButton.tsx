'use client'

import { MenuItemState } from "@/app/game/_engine/FocusNavigator/useFocusNavigator";

interface MenuButtonState {
  active: boolean;
  [key: string]: unknown;
}

interface MenuButtonProps {
  item: MenuItemState;
  onClick: () => void;
  onHover?: () => void;
  isTurnedOn: boolean;
  state: MenuButtonState;
}

function MenuButton({ item, state, onClick, onHover, isTurnedOn }: MenuButtonProps) {
  const isActive = state.active;
  const text = item.text;

  return (
    <button
      type="button"
      className={`
        font-neontubes
        text-[clamp(1.5rem,2.5vw,2rem)]
        outline-none transition-all duration-200
        ${isTurnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"}
        ${isActive && isTurnedOn ? "active-item neon2 scale-105" : ""}
      `}
      onClick={onClick}
      onMouseEnter={onHover}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${text}${isActive ? " (active)" : ""}`}
    >
      {text}
    </button>
  );
}

export default MenuButton;
