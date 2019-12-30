import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { addToQuestionSucess } from './actions';

function* addToQuestion({ id }) {
    const response = yield call(api.get, `/questions/${id}`);
    const data = {
        ...response.data,
    };
    yield put(addToQuestionSucess(data));
    toast.warn('Novo plano de ação será aberto');
}
export default all([takeLatest('@question/ADD_REQUEST', addToQuestion)]);
