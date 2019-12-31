import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
import { addToSetorSucess } from './actions';

function* addToSetor({ payload }) {
    const { id } = payload;
    const response = yield call(api.get, `/setor/${id}`);
    yield put(addToSetorSucess(response.data));
}
export default all([takeLatest('@setor/ADD_REQUEST', addToSetor)]);
