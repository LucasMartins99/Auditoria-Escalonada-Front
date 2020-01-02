import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
import { addToSetorSucess } from './actions';
import history from '~/services/history';

function* addToSetor({ payload }) {
    const { id } = payload;
    const response = yield call(api.get, `/setor/${id}`);
    yield put(addToSetorSucess(response.data));
    history.push('/create-auditoria');
}
export default all([takeLatest('@setor/ADD_REQUEST', addToSetor)]);
