import produce from 'immer';

export default function auditoria(state = [], action) {
    switch (action.type) {
        case '@question/ADD_SUCESS':
            return produce(state, draft => {
                const { question } = action;
                draft.push(question);
            });
        default:
            return state;
    }
}
