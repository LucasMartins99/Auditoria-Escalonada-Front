import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login/index';
import CreateUser from '../pages/CreateUser/index';
import Main from '../pages/Main/index';
import Operador from '../pages/Operador/index';
import CreatePlan from '../pages/Plano/Create/index';
import CreateAuditoria from '../pages/Auditoria/Create/index';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={CreateUser} />
            <Route path="/main" component={Main} isPrivate />
            <Route path="/operador" component={Operador} isPrivate />
            <Route
                path="/create-auditoria"
                component={CreateAuditoria}
                isPrivate
            />
            <Route path="/create-plano" component={CreatePlan} isPrivate />
        </Switch>
    );
}
