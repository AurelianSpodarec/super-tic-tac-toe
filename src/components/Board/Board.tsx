import React, { useState, useEffect } from 'react';
import Square from './sub-components/Square/Square';
import Row from './sub-components/Row/Row';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();


function Board() {
    const [grid, setGrid] = useState<Array<Array<number | string>>>([]);
    const [isLoading, setLoading] = useState(true);

    const [isXNext, setXNext] = useState(false)

    const row = 10;
    const col = 5;

    function make2Darray(cols: number, rows: number) {
        const arr = new Array(cols)
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows)
            // arr[i] = " "
        }
        return arr;
    }

    useEffect(() => {
        setGrid(make2Darray(row, col))
        setLoading(false)
    }, [])


    // { console.log("grid", grid[1][1]) }
    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )

    }
    return (
        <div className="board">
            {
                new Array(row).fill(null).map((row, i) => {
                    return (
                        <div className="row" key={i}>
                            {new Array(col).fill(null).map((col, j) => {
                                // { console.log("Adfasdfa", i, j) }
                                return <Square
                                    key={j}
                                    value={grid[j][i]}
                                    onClick={() => {
                                        const nextSquares = grid
                                        nextSquares[j][i] = isXNext ? "x" : "o"
                                        setGrid(nextSquares)
                                        setXNext(!isXNext)
                                        console.log("click", j, i)
                                    }}
                                />
                            })}
                        </div>
                    )
                })
            }


        </div>
    );
}

export default Board;