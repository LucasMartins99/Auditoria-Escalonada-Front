import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@plan/ADD_TO_PLAN_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@plan/ADD_TO_PLAN_SUCCESS': {
                draft.loading = false;
                break;
            }

            case '@plan/ADD_TO_PLAN_FAILURE': {
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
