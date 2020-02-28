/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login/index';
import CreateUser from '../pages/CreateUser/index';
import Main from '../pages/Main/index';
import Operador from '../pages/Operador/index';
import CreateAuditoria from '../pages/Auditoria/Create/index';
import CreatePlan from '../pages/Plano/Create/index';
import Plano from '../pages/Plano/index';
import Auditoria from '../pages/Auditoria/index';
import NewAuditoria from '../pages/Auditoria/New/index';
import UpdatePlan from '../pages/Plano/Update/index';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={CreateUser} isPrivate />
            <Route path="/main" component={Main} isPrivate />
            <Route path="/operador" component={Operador} isPrivate />
            <Route path="/planos" component={Plano} isPrivate />
            <Route path="/auditoria" component={Auditoria} isPrivate />
            <Route
                path="/create-auditoria"
                component={CreateAuditoria}
                isPrivate
            />
            <Route
                path="/create-auditoria-operador/:id/:semana/:turno"
                component={CreateAuditoria}
                isPrivate
            />
            <Route
                path="/create-plano-operador/:dataop"
                component={CreatePlan}
                isPrivate
            />
            <Route path="/create-plano" component={CreatePlan} isPrivate />

            <Route
                path="/new-auditoria/:id"
                component={NewAuditoria}
                isPrivate
            />
            <Route path="/new-auditoria" component={NewAuditoria} isPrivate />
            <Route path="/update-plan/:id" component={UpdatePlan} isPrivate />
        </Switch>
    );
}
