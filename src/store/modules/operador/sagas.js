import { call, put, all, takeLatest } from 'redux-saga/effects';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { addToSetorSucess } from '../setor/actions';
import api from '~/services/api';

function* addToOperador({ payload }) {
    const { name, turno, data, semana, setor, cargo, re } = payload;
    const ano2 = format(new Date(), 'yyyy', { locale: pt });
    const ano = parseInt(ano2, 0);
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
        re,
        ano,
    });
    yield put(addToSetorSucess(response.data));
    toast.warn('Responda as questões abaixo');
}
export default all([takeLatest('@operador/ADD_REQUEST', addToOperador)]);
