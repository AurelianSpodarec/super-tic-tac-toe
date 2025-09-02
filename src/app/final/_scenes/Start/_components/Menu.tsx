'use client'

import React from "react";

interface MenuListProps {
  items: MenuItemState[];
  renderItem: (item: MenuItemState, index: number) => React.ReactNode;
  direction?: "vertical" | "horizontal";
}

export function MenuList({ items, renderItem, direction = "vertical" }: MenuListProps) {
  const isHorizontal = direction === "horizontal";
  return (
    <nav className={`flex ${isHorizontal ? "flex-row" : "flex-col"} mt-10`}>
      {items.map((item, index) => (
        <React.Fragment key={item.text}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </nav>
  );
}

interface MenuButtonProps {
  item: MenuItemState;
  onClick: () => void;
  onHover?: () => void;
}

export function MenuButton({ item, onClick, onHover }: MenuButtonProps) {
  return (
    <button
      type="button"
      className={`
        font-neontubes
        text-[clamp(1.5rem,2.5vw,2rem)]
        outline-none transition-all duration-200
        ${item.turnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"}
        ${item.active && item.turnedOn ? "active-item neon2 scale-105" : ""}
      `}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {item.text}
    </button>
  );
}