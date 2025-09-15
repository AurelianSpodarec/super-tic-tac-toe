'use client'

export interface IUserItem {
  avatar: string
  name: string
  labelPosition?: "left" | "right"
}

function UserItem({ avatar, name, labelPosition = "left" }: IUserItem) {
  return (
    <div className={`flex items-center gap-3 ${labelPosition === "left" ? "flex-row" : "flex-row-reverse"}`}>
      <img
        className="size-14 rounded-lg object-cover"
        src={avatar}
        alt={name}
      />
      <span className="text-white text-sm font-medium">{name}</span>
    </div>
  )
}

export default UserItem

// Last week on news I've heared a guy got whacked after he lost a tic tac toe game - I always win.
// Nice game! Do you play Jazz as good as the game?
// Last guy who beat me ended up in hospital.

// Good luck Mr Anonymous! 
// First time for everything!
// You're better than I though.
