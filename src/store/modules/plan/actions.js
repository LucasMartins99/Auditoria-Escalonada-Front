export function addToPlanRequest(data, auditoria_id) {
    return {
        type: '@plan/ADD_TO_PLAN_REQUEST',
        payload: { data },
        auditoria_id,
    };
}
export function addToPlanSuccess() {
    return {
        type: '@plan/ADD_TO_PLAN_SUCCESS',
    };
}
export function addToPlanFailure() {
    return {
        type: '@plan/ADD_TO_PLAN_FAILURE',
    };
}
