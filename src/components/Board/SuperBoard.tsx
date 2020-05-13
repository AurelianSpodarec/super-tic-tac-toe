import React, { useState } from 'react';
import Square from './sub-components/Square/Square';
import Board from './Board';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();

function SuperBoard() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setXNext] = useState(true);

    function renderSquare(i: number) {
        return <Board />
    }

    function handleClick(index: any) {
        console.log("handle click", index)
    }

    return (
        <div className="bg">

            {
                squares.map((_, index) => {
                    return <Board />
                })
            }

        </div>
    );
}

export default SuperBoard;