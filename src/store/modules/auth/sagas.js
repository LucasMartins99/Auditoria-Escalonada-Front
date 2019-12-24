import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
    try {
        const { email, password } = payload;
        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });
        const { token, user } = response.data;

        yield put(loginSuccess(token, user));
        history.push('/main');
    } catch (err) {
        toast.error('Falha na autenticação, verifique seus dados');
        yield put(loginFailure());
    }
}
export function* createUser({ payload }) {
    try {
        const { name, email, password, cargo } = payload;
        yield call(api.post, 'users', {
            name,
            email,
            password,
            cargo,
        });
        history.push('/');
    } catch (err) {
        toast.error('Falha no cadastro, verifique os dados !');
        yield put(loginFailure());
    }
}
export default all([
    takeLatest('@auth/LOGIN_REQUEST', login),
    takeLatest('@auth/CREATE_USER_REQUEST', createUser),
]);
