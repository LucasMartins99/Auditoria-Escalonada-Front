import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { addToPlanFailure, addToPlanSuccess } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* addToPlan({
    payload,
    dataOp,
    auditoria_id,
    prazo,
    avatar_id,
    cargo,
}) {
    const status = 'Realizado';
    const dataAtual = new Date();
    let data = format(dataAtual, 'yyyy/MM/dd', { locale: pt });
    if (cargo === 'Operador') {
        data = dataOp;
    }

    try {
        const {
            problema,
            auditor,
            maquina,
            setor,
            acao,
            responsavel,
            area,
            item,
            subitem,
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
            prazo,
            avatar_id,
            area,
            subitem,
        });
    } catch (err) {
        toast.error('Falha no cadastro da ação !!');
        yield put(addToPlanFailure);
    }
    if (cargo === 'Operador') {
        yield call(api.put, `/auditoria/${auditoria_id}`, {
            status,
        });
        toast.success('Ação cadastrada com sucesso');
        history.push(`/create-plano-operador/${data}`);
    } else {
        yield call(api.put, `/auditoria/${auditoria_id}`, {
            status,
            data,
        });
        toast.success('Ação cadastrada com sucesso');
        history.push('/create-plano');
    }
    yield put(addToPlanSuccess(payload.data));
}
export default all([takeLatest('@plan/ADD_TO_PLAN_REQUEST', addToPlan)]);
