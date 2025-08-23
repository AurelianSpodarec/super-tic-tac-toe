import { modes } from "./Menu/data";

function GameScreen({ modeId, onExit }: { modeId: string; onExit: () => void }) {
  const mode = modes.find(m => m.id === modeId);

  return (
    <div className="p-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {mode?.label || "Game"}
      </motion.h1>
      <motion.button
        onClick={onExit}
        style={{ marginTop: 24, padding: 12, cursor: "pointer" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Exit Game
      </motion.button>
    </div>
  );
}

export default GameScreen
