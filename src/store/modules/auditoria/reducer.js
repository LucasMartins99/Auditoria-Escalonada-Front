import produce from 'immer';
import { toast } from 'react-toastify';

export default function auditoria(state = [], action) {
    switch (action.type) {
        case '@question/ADD_SUCESS':
            return produce(state, draft => {
                const { question } = action;
                draft.push(question);
            });
        case '@question/REMOVE':
            return produce(state, draft => {
                const questionIndex = draft.findIndex(q => q.id === action.id);
                toast.success('Item registrado com sucesso');
                if (questionIndex >= 0) {
                    draft.splice(questionIndex, 1);
                }
            });
        case '@auth/SIGN_OUT':
            return produce(state, draft => {
                const { question } = action;
                draft.splice(question);
            });
        default:
            return state;
    }
}
