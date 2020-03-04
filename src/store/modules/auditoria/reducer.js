import produce from 'immer';
import { toast } from 'react-toastify';

export default function auditoria(state = [], action) {
    switch (action.type) {
        case '@question/ADD_SUCESS':
            return produce(state, draft => {
                const { question } = action;
                const exist = draft.filter(q => q.id === question.id);
                if (exist.length < 1) {
                    draft.push(question);
                }
            });
        case '@question/REMOVE':
            return produce(state, draft => {
                const questionIndex = draft.findIndex(q => q.id === action.id);
                toast.success('Item registrado com sucesso');
                if (questionIndex >= 0) {
                    draft.splice(questionIndex, 1);
                }
            });
        case '@plan/ADD_TO_PLAN_SUCCESS':
            return produce(state, draft => {
                const exist = draft.filter(
                    q => q.item === action.payload.data.item
                );

                if (exist >= 0) {
                    draft.splice(exist, 1);
                }
            });
        case '@auth/SIGN_OUT':
            return produce(state, draft => {
                const { question } = action;
                draft.splice(question);
            });
        case '@auditoria/ADD_SUCCESS':
            return state;
        default:
            return state;
    }
}
