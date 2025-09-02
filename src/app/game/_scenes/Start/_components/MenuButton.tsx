'use client'

import { MenuItemState } from "@/app/final/_engine/useMenuController";

interface MenuButtonProps {
  item: MenuItemState;
  onClick: () => void;
  onHover?: () => void;
}

function MenuButton({ item, onClick, onHover }: MenuButtonProps) {
  const isActive = item.active
  const isTurnedOn = item.turnedOn

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
      aria-label={`${item.text}${isActive ? " (active)" : ""}`}
    >
      {item.text}
    </button>
  );
}

export default MenuButton
