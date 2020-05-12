import React from 'react'

// Create Box component
const Square = ({ onClick: MouseEvent < HTMLButtonElement >, value }) => {
    return (
        <button className="board__box" onClick={onClick}>
            {value}
        </button>
    )
}

export default Square;