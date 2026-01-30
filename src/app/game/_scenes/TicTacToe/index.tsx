import NeonGrid from "./_components/NeonGrid"

type VsMode = "ai" | "local" | "online";
type GameMode = "classic" | "misere";

function SceneGameTicTacToe({
  mode = "classic",
  vs = "local",
}: {
  mode?: GameMode;
  vs?: VsMode;
}) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <NeonGrid mode={mode} vs={vs} />
    </div>
  )
}

export default SceneGameTicTacToe



{/* Backgrounds */ }
{/* <div
        className="fixed top-0 bottom-0 h-full inset-0 opacity-30 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/music-bg.jpg')" }}
      /> */}