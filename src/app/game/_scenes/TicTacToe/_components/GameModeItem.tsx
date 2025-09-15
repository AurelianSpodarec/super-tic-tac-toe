'use client'

interface A {
  image: string
  name: string
}

function GameModeItem({ item }: {item: A}) {
  return (
    <div className="rounded-lg h-[250px] w-[250px] hover:scale-105 transition duration-75 ease-in-out">
      <div className="absolute h-[250px] w-[250px] bg-white rounded-lg">
        <img src={item.image} className="w-full h-full rounded-lg" />
        <span>{item.name}</span>
        <span>Game Ruless</span>
      </div>
    </div>
  )
}

export default GameModeItem
