import React, { useState } from 'react';
import Square from './sub-components/Square/Square';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setXNext] = useState(true);

    function renderSquare(i: number) {
        return <Square
            key={i}
            value={squares[i]}
            onClick={() => {
                const nextSquares = squares.slice()
                nextSquares[i] = isXNext ? "x" : "o"
                setXNext(!isXNext)
                setSquares(nextSquares)
            }}
        />
    }

    function handleClick(index: any) {
        console.log("handle click", index)
    }

    return (
        <div className="bg">

            {
                squares.map((_, index) => {
                    return renderSquare(index)
                })
            }

        </div>
    );
}

export default Board;