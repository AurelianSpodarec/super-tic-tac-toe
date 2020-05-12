import React from 'react';
import { Board } from '../components';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// const browserHistory = createBrowserHistory();

function Game() {

    return (
        <div className="bg">
            <Board />
        </div>
    );
}

export default Game;