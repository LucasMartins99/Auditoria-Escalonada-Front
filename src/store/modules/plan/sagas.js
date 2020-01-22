import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { addToPlanFailure, addToPlanSuccess } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* addToPlan({ payload, auditoria_id }) {
    const status = 'Realizado';
    const dataAtual = new Date();
    const data = format(dataAtual, 'yyyy/MM/dd', { locale: pt });
    try {
        const {
            item,
            problema,
            auditor,
            maquina,
            setor,
            acao,
            responsavel,
            conclusao,
            avatar_id,
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
            conclusao,
            avatar_id,
        });
    } catch (err) {
        toast.error('Falha no cadastro da ação !!');
        yield put(addToPlanFailure);
    }
    yield call(api.put, `/auditoria/${auditoria_id}`, {
        status,
        data,
    });
    toast.success('Ação cadastrada com sucesso');
    history.push('/main');
    yield put(addToPlanSuccess(payload.data));
}
export default all([takeLatest('@plan/ADD_TO_PLAN_REQUEST', addToPlan)]);
