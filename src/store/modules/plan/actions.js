export function addToPlanRequest(data, auditoria_id, prazo, avatar_id) {
    return {
        type: '@plan/ADD_TO_PLAN_REQUEST',
        payload: { data },
        auditoria_id,
        prazo,
        avatar_id,
    };
}
export function addToPlanSuccess(data) {
    return {
        type: '@plan/ADD_TO_PLAN_SUCCESS',
        payload: { data },
    };
}
export function addToPlanFailure() {
    return {
        type: '@plan/ADD_TO_PLAN_FAILURE',
    };
}
