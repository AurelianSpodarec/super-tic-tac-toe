'use client'

// ToDo: Make this like video game/play statoin grid, where the user can navigate a grid naturally and on mobile its alays stacked as one

import React from "react";
import useFocusNavigator, { MenuItemState, MenuItem } from "./useFocusNavigator";

interface FocusNavigatorProps {
  data: MenuItem[];
  direction?: "vertical" | "horizontal";
  className?: string;
  onSelect?: (item: MenuItem, index: number) => void;
  renderItem: (
    item: MenuItemState,
    index: number,
    state: {
      onClick: () => void;
      onHover: () => void;
      onLeave: () => void;
      onSelect: () => void;
    }
  ) => React.ReactNode;
}

function FocusNavigator({
  data,
  direction = "vertical",
  className = "",
  onSelect,
  renderItem,
}: FocusNavigatorProps) {
  const { items: stateItems, setActive, select } = useFocusNavigator(data, undefined, direction);
  const isHorizontal = direction === "horizontal";

  function handleHover(index: number) {
    setActive(index);
  }

  function handleClick(index: number) {
    select(index);
    onSelect?.(stateItems[index], index);
  }

  function renderItemWrapper(item: MenuItemState, index: number) {
    return renderItem(item, index, {
      onClick: () => handleClick(index),
      onHover: () => handleHover(index),
      onLeave: () => handleHover(-1),
      onSelect: () => handleClick(index),
    });
  }

  return (
    <nav className={`flex ${isHorizontal ? "flex-row" : "flex-col"} ${className}`}>
      {stateItems.map((item, index) => (
        <React.Fragment key={item.text}>
          {renderItemWrapper(item, index)}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default FocusNavigator;
