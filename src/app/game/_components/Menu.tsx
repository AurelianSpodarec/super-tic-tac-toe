'use client'

import React from "react";
import { useMenuController, MenuItemState, MenuItem } from "../_engine/useMenuController";

interface MenuListProps {
  data: MenuItem[];
  direction?: "vertical" | "horizontal";
  className?: string;
  onSelect?: (item: MenuItem, index: number) => void;
  renderItem: (
    item: MenuItemState, // use MenuItemState from controller
    index: number,
    state: {
      onClick: () => void;
      onHover: () => void;
      onLeave: () => void;
      onSelect: () => void;
    }
  ) => React.ReactNode;
}

function MenuList({ data, direction = "vertical", className = "", onSelect, renderItem }: MenuListProps) {
  const { items: stateItems, setActive, select } = useMenuController(data, undefined, direction);

  const isHorizontal = direction === "horizontal";

  function handleHover(index: number) {
    setActive(index);
  }

  function handleClick(index: number) {
    select(index);
    onSelect?.(stateItems[index], index);
  }

  return (
    <nav className={`flex ${isHorizontal ? "flex-row" : "flex-col"} ${className}`}>
      {stateItems.map((item, index) => (
        <React.Fragment key={item.text}>
          {renderItem(item, index, {
            onClick: () => handleClick(index),
            onHover: () => handleHover(index),
            onLeave: () => handleHover(-1),
            onSelect: () => handleClick(index),
          })}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default MenuList;
