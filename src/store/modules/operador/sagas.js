import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addToSetorSucess } from '../setor/actions';
import api from '~/services/api';

function* addToOperador({ payload }) {
    const { name, turno, data, semana, setor, cargo, re } = payload;
    const auditor = name;
    const status = 'Planejado';
    const response = yield call(api.post, 'auditoria', {
        setor,
        auditor,
        turno,
        semana,
        data,
        status,
        cargo,
        re
    });
    yield put(addToSetorSucess(response.data));
}
export default all([takeLatest('@operador/ADD_REQUEST', addToOperador)]);
