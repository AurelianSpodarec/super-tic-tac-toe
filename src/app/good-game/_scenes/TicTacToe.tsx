import { useState } from "react";
import AnimatedO from "../_components/Shapes/AnimatedO";
import AnimatedX from "../_components/Shapes/AnimatedX";

function UserBox({ name, score }) {
  return (
    <div className="text-center">
      <div>{score}</div>
      <div>{name}</div>
    </div>
  )
}

function GenerateBoard() {
  const [grid, setGrid] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const handleClick = (i: number) => {
    if (grid[i]) return; // already filled
    const newGrid = [...grid];
    newGrid[i] = turn;
    setGrid(newGrid);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="relative w-[400px] h-[400px] mt-8">
      {/* Board lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="100" y1="10" x2="100" y2="290" className="neon-line on" />
        <line x1="200" y1="10" x2="200" y2="290" className="neon-line on" />
        <line x1="10" y1="100" x2="290" y2="100" className="neon-line on" />
        <line x1="10" y1="200" x2="290" y2="200" className="neon-line on" />
      </svg>

      {/* Cells */}
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full relative">
        {grid.map((cell, i) => (
          <div
            key={i}
            className="flex items-center justify-center cursor-pointer"
            onClick={() => handleClick(i)}
          >
            {cell === "X" && <AnimatedX />}
            {cell === "O" && <AnimatedO />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneModeTicTacToe() {
  const grid = Array(9).fill(null);

  return (
    <div className="flex flex-col items-center h-full w-full text-white text-2xl pt-24">
      <header className="flex space-x-6">
        <UserBox name="You" score="0" />
        <span>VS</span>
        <UserBox name="Friend" score="0" />
      </header>

      <GenerateBoard grid={grid} />
    </div>
  );
}

export default SceneModeTicTacToe
