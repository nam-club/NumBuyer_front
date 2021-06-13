import React from 'react';
import {Switch, Route} from 'react-router';
import {Top, Lobby, Game} from './templates';

const Router = ()  => {
    return (
        <Switch>
            <Route exact path={"(/)?"} component={Top} />
            <Route exact path={"/Lobby"} component={Lobby} />
            <Route exact path={"/Game"} component={Game} />
        </Switch>
    )
}

export default Router;