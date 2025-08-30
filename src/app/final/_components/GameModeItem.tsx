'use client'

function GameModeItem({ item }: any) {
  return (
    <div className="box rounded-lg h-[250px] w-[250px] neon2 hover:scale-105 transition duration-75 ease-in-out">
      <div className="box-container h-[250px] w-[250px] bg-white rounded-lg">
        <img src={item.image} className="w-full h-full rounded-lg" />
        <span>{item.name}</span>
        <span>Game Ruless</span>
      </div>
    </div>
  )
}

export default GameModeItem
