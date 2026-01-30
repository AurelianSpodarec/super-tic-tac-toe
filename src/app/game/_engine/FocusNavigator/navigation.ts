type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

type Args = {
  key: ArrowKey;
  activeIndex: number;
  itemCount: number;
  columns: number;
  rows: number;
  direction: "horizontal" | "vertical";
};

export function getNextIndex({
  key,
  activeIndex,
  itemCount,
  columns,
  rows,
  direction,
}: Args): number {
  if (itemCount <= 0) return 0;

  const cols = Math.max(1, columns);
  const rowsToUse = Math.max(1, rows);

  let row = Math.floor(activeIndex / cols);
  let col = activeIndex % cols;

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

  return Math.min(row * cols + col, itemCount - 1);
}
