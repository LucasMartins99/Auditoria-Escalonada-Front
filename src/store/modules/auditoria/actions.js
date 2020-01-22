export function addToQuestionRequest(id) {
    return {
        type: '@question/ADD_REQUEST',
        id,
    };
}

export function addToQuestionSucess(question) {
    return {
        type: '@question/ADD_SUCESS',
        question,
    };
}
export function removeFromQuestion(id) {
    return {
        type: '@question/REMOVE',
        id,
    };
}
export function addAuditoriaRequest(auditoria_id) {
    return {
        type: '@auditoria/ADD_REQUEST',
        auditoria_id,
    };
}
export function addAuditoriaSuccess() {
    return {
        type: '@auditoria/ADD_SUCCESS',
    };
}
export function addAuditoriaFailure() {
    return {
        type: '@auditoria/ADD_FAILURE',
    };
}
