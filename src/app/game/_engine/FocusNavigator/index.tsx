'use client'

import React from "react";
import useFocusNavigator, { MenuItemState, MenuItem } from "./useFocusNavigator";

interface FocusNavigatorProps {
  data: MenuItem[];
  columns?: number;
  columnsMobile?: number;
  rows?: number;
  direction?: "horizontal" | "vertical";
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

export default function FocusNavigator({
  data,
  columns = 3,
  columnsMobile = 1,
  rows,
  direction = "horizontal",
  className = "",
  onSelect,
  renderItem,
}: FocusNavigatorProps) {
  const { items: stateItems, setActive, select } = useFocusNavigator({
    items: data,
    columns,
    rows,
    columnsMobile,
    direction,
    // onSelect,
  });

  const handleHover = (index: number) => setActive(index);
  const handleClick = (index: number) => {
    select(index);
    onSelect?.(stateItems[index], index);
  };

  const renderItemWrapper = (item: MenuItemState, index: number) =>
    renderItem(item, index, {
      onClick: () => handleClick(index),
      onHover: () => handleHover(index),
      onLeave: () => handleHover(-1),
      onSelect: () => handleClick(index),
    });

  return (
    <nav
      className={`focus-grid ${className}`}
      style={{
        "--cols": columns,
        "--cols-mobile": columnsMobile,
      } as React.CSSProperties}
    >
      {stateItems.map((item, index) => (
        <React.Fragment key={item.text}>
          {renderItemWrapper(item, index)}
        </React.Fragment>
      ))}
    </nav>
  );
}
