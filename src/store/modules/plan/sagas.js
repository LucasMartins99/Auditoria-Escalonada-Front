import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { addToPlanFailure, addToPlanSuccess } from './actions';
import api from '~/services/api';

export function* addToPlan({ payload, auditoria_id }) {
    try {
        const {
            item,
            problema,
            auditor,
            maquina,
            setor,
            acao,
            responsavel,
            data,
        } = payload.data;
        yield call(api.post, `plan/${auditoria_id}`, {
            item,
            problema,
            auditor,
            maquina,
            setor,
            acao,
            responsavel,
            data,
        });
    } catch (err) {
        toast.error('Falha no cadastro da ação !!');
        yield put(addToPlanFailure);
    }
    toast.success('Ação cadastrada com sucesso');
    yield put(addToPlanSuccess);
}
export default all([takeLatest('@plan/ADD_TO_PLAN_REQUEST', addToPlan)]);
