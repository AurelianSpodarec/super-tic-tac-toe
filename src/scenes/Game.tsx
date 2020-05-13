import React from 'react';
import { Board } from '../components';
import SuperBoard from '../components/Board/SuperBoard';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();

function Game() {

    return (
        <div className="bg">
            <Board />
            {/* <SuperBoard /> */}
        </div>
    );
}

export default Game;