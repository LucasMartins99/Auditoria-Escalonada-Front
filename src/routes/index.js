import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login/index';
import CreateUser from '../pages/CreateUser/index';

import Main from '../pages/Main/index';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={CreateUser} />
            <Route path="/main" component={Main} isPrivate />
        </Switch>
    );
}
