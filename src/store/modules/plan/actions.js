export function addToPlanRequest(data) {
    return {
        type: '@plan/ADD_TO_PLAN_REQUEST',
        payload: { data },
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
