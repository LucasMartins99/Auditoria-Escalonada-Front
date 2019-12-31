import produce from 'immer';

const INITIAL_STATE = {
    setor: null,
};

export default function setor(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@setor/ADD_SUCESS':
            return produce(state, draft => {
                draft.setor = action.payload.setor;
            });
        default:
            return state;
    }
}
