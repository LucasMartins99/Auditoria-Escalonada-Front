import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import {
    loginSuccess,
    loginFailure,
    addToUserSuccess,
    createUserFailure,
} from './actions';

export function* login({ payload }) {
    try {
        const { email, password } = payload;
        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });
        const { token, user } = response.data;
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(loginSuccess(token, user));

        if (user.name === 'operador') {
            history.push('/operador');
        } else {
            history.push('/main');
        }
    } catch (err) {
        toast.error('Falha na autenticação, verifique seus dados');
        yield put(loginFailure());
    }
}
export function* createUser({ payload }) {
    try {
        const { name, email, password, cargo } = payload.data;

        yield call(api.post, 'users', {
            name,
            email,
            password,
            cargo,
        });
        toast.success('Usuario cadastrado');
        yield put(addToUserSuccess());
        history.push('/main');
    } catch (err) {
        toast.error('Falha no cadastro, verifique os dados !');

        yield put(createUserFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;
    const { token } = payload.auth;
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}
export function signOut() {
    history.push('/');
}
export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/LOGIN_REQUEST', login),
    takeLatest('@auth/CREATE_USER_REQUEST', createUser),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
