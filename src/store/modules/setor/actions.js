export function addSetorRequest(id) {
    return {
        type: '@setor/ADD_REQUEST',
        payload: { id },
    };
}
export function addToSetorSucess(setor) {
    return {
        type: '@setor/ADD_SUCESS',
        payload: { setor },
    };
}
