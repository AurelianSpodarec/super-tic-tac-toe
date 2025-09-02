'use client'

import React from "react";
import { MenuItemState } from "../_engine/useMenuController";

interface MenuListProps {
  items: MenuItemState[];
  renderItem: (item: MenuItemState, index: number) => React.ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
}

function MenuList({ items, renderItem, direction = "vertical", className }: MenuListProps) {
  const isHorizontal = direction === "horizontal";
  return (
    <nav className={`flex ${isHorizontal ? "flex-row" : "flex-col"} ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.text}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default MenuList
