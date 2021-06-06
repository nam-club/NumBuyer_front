import React from 'react';
import {Switch, Route} from 'react-router';
import {Top} from './templates';

const Router = ()  => {
    return (
        <Switch>
            <Route exact path={"(/)?"} component={Top} />
        </Switch>
    )
}

export default Router;