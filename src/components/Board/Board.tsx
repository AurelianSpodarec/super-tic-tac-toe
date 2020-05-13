import React, { useState, useEffect } from 'react';
import Square from './sub-components/Square/Square';
import Row from './sub-components/Row/Row';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();


function Board() {
    const [grid, setGrid] = useState<Array<Array<number>>>([]);

    const [isXNext, setXNext] = useState(false)

    const row = 10;
    const col = 5;

    function make2Darray(cols: number, rows: number) {
        const arr = new Array(cols)
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows)
        }
        return arr;
    }

    useEffect(() => {
        setGrid(make2Darray(row, col))
    }, [])


    return (
        <div className="board">

            {
                new Array(row).fill(null).map((row, i) => {
                    return (
                        <div className="row" key={i}>
                            {new Array(col).fill(null).map(col => {
                                return <Square
                                    key={i}
                                // value={grid[i]}
                                // onClick={() => {
                                //     const nextSquares = grid.slice()
                                //     nextSquares[i][i] = isXNext ? "x" : "o"
                                //     setXNext(!isXNext)
                                //     setGrid(nextSquares)
                                // }}
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


{/* <Square
key={i}
value={squares[i]}
onClick={() => {
    const nextSquares = squares.slice()
    nextSquares[i] = isXNext ? "x" : "o"
    setXNext(!isXNext)
    setSquares(nextSquares)
}}
/> */}

{/* {
                grid.map((x, y) =>
                    <>
                        {console.log("rpw", x, y)}
                        <div className="row">

                            {Array(y).fill(null).map((d, f) =>
                                <button className="column">{f}</button>
                            )}
                        </div>
                    </>
                )
            } */}
{/* {
                grid.map((column, rowNum) =>
                    <div className="row" key={rowNum} >

                        {console.log("row", column, rowNum)}
                        {
                            column.map((contents, columnNum) =>
                                <>
                                    {console.log("column", contents, columnNum)}
                                    <Square key={columnNum} value={1} />
                                </>
                            )
                        }

                    </div>
                )
            } */}