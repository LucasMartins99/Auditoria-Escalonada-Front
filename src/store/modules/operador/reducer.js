import produce from 'immer';

const INITIAL_STATE = {
    name: null,
    turno: null,
    data: null,
    auditoria_id: null,
};

export default function operador(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@operador/ADD_SUCESS':
            return produce(state, draft => {
                draft.name = action.payload.auditor;
                draft.turno = action.payload.turno;
                draft.data = action.payload.data;
                draft.auditoria_id = action.payload.id;
            });
        case '@operador/OUT_SUCCESS':
            return produce(state, draft => {
                draft.name = null;
                draft.turno = null;
                draft.data = null;
            });
        default:
            return state;
    }
}
