import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import auditoria from './auditoria/reducer';
import setor from './setor/reducer';
import operador from './operador/reducer';

export default combineReducers({
    auth,
    user,
    auditoria,
    setor,
    operador,
});
