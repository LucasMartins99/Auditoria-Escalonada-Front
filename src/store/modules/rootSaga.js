import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
import auditoria from './auditoria/sagas';
import setor from './setor/sagas';

export default function* rootSaga() {
    return yield all([auth, user, auditoria, setor]);
}
