// scenes/TicTacToe.tsx
import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import { SceneContext, useSceneExiting } from "../SceneContext";
import { sceneManager } from "../SceneManager";

function SceneTest({ setSceneExiting }: { setSceneExiting: (b: boolean) => void }) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<"X" | "O">("X");
  const exiting = useSceneExiting();

  useEffect(() => {
    if (exiting) {
      console.log("Scene exiting, trigger granular animations");
    }
  }, [exiting]);

  const play = (i: number) => {
    if (board[i]) return;
    const next = [...board];
    next[i] = current;
    setBoard(next);
    setCurrent(current === "X" ? "O" : "X");
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-white text-xl mb-4">Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((c, i) => (
          <motion.div
            key={i}
            className="w-20 h-20 bg-gray-800 flex items-center justify-center text-white text-2xl cursor-pointer"
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => play(i)}
          >
            {c}
          </motion.div>
        ))}
      </div>
      <button className="mt-4" onClick={() => sceneManager.back()}>Back</button>
    </div>
  );
}

export default SceneTest
