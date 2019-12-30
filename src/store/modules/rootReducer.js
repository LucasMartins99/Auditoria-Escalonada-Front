import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import auditoria from './auditoria/reducer';

export default combineReducers({
    auth,
    user,
    auditoria,
});
