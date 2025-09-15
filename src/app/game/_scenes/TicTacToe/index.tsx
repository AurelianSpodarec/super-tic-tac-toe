import NeonGrid from "./_components/NeonGrid"
import UserItem from "./_components/UserItem"

function SceneGameTicTacToe() {
  return (
    <div className="h-full w-full flex items-center justify-center">

      {/* <div className="w-[700px] text-center z-10">
        <div className="mb-2">
          <span className="text-gray-50 text-lg">1:34</span>
        </div>
        <div className="mb-5 text-center text-[#ef476f] bg-[#ef476f]/30 backdrop-blur inline-block mx-auto py-1.5 px-3 font-bold rounded-lg">
          Aurelian's turn
        </div>
        <header className="flex justify-between relative">
          <UserItem name="Aurelian Spodarec" avatar="https://i.imgur.com/cTzL0ai.png" />
          <UserItem name="Novice AI" avatar="https://i.imgur.com/Osx2CgE.png" labelPosition="right" />
        </header>

        <section> */}
          <NeonGrid />
          {/* <button className="text-white mt-14 text-3xl">Start</button>
        </section>
      </div> */}

    </div>
  )
}

export default SceneGameTicTacToe



{/* Backgrounds */ }
{/* <div
        className="fixed top-0 bottom-0 h-full inset-0 opacity-30 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/music-bg.jpg')" }}
      /> */}