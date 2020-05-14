import React, { useState, useEffect } from 'react';
import Square from './sub-components/Square/Square';
import Row from './sub-components/Row/Row';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();


function Board() {
    const [board, setBoard] = useState<Array<Array<number | string>>>([]);
    const [isLoading, setLoading] = useState(true);

    const [winner, setWinner] = useState()

    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);

    const [isXNext, setXNext] = useState(false)

    const row = 3;
    const col = 3;

    function make2Darray(cols: number, rows: number) {
        const arr = new Array(cols)
        for (let i = 0; i < arr.length; i++) {
            let insArr = arr[i] = new Array(rows)
            for (let j = 0; j < insArr.length; j++) {
                insArr[j] = "empty"
            }
        }
        return arr;
    }

    console.log(board)

    function checkWin() {
        if (!isLoading) {

            // User wins +1 score
            // Users draw +0.5 score

            // Vertical
            for (let i = 0; i < 3; i++) {
                if (
                    board[i][0] === board[i][0] && board[i][0] === board[i][2]) {
                    let currentWin = board[i][0];

                    setWinner(currentWin)

                    if (currentWin === "x") {
                        setXScore(xScore + 1)
                    } else {
                        setOScore(oScore + 1)
                    }
                }
            }

            // Horizontal
            for (let i = 0; i < 3; i++) {
                if (
                    board[0][i] === board[0][i] && board[0][i] === board[2][i]) {
                    let currentWin = board[0][i];

                    setWinner(currentWin)

                    if (currentWin === "x") {
                        setXScore(xScore + 1)
                    } else {
                        setOScore(oScore + 1)
                    }
                }
            }

        }

    }

    function onSquareClick(j: number, i: number) {
        const nextSquares = board
        nextSquares[j][i] = isXNext ? "x" : "o"
        setBoard(nextSquares)
        setXNext(!isXNext)
        console.log("click", j, i)
    }

    useEffect(() => {
        checkWin()
    }, [isXNext])

    useEffect(() => {
        setBoard(make2Darray(row, col))
        setLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )

    }

    return (
        <div className="board">
            <div onClick={checkWin}>Check win</div>

            <div>
                <div>Winner: {winner}</div>
                <div>User Turn: {isXNext ? "X" : "O"}</div>
                <div>
                    <div>X Score: {xScore}</div>
                    <div>O Score: {oScore}</div>
                </div>
            </div>

            {
                new Array(row).fill("null").map((row, i) => {
                    return (
                        <div className="row" key={i}>
                            {new Array(col).fill("null").map((col, j) => {
                                return (
                                    <Square
                                        key={j}
                                        value={board[j][i]}
                                        onClick={() => onSquareClick(j, i)}
                                    />
                                )
                            })}
                        </div>
                    )
                })
            }


        </div>
    );
}

export default Board;