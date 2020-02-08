export function addToPlanRequest(
    data,
    dataOp,
    auditoria_id,
    prazo,
    avatar_id,
    cargo
) {
    return {
        type: '@plan/ADD_TO_PLAN_REQUEST',
        payload: { data },
        auditoria_id,
        prazo,
        avatar_id,
        dataOp,
        cargo,
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
