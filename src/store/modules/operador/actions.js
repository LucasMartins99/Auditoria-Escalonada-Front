export function addOperadorRequest(
    name,
    turno,
    data,
    semana,
    setor,
    cargo,
    re
) {
    return {
        type: '@operador/ADD_REQUEST',
        payload: { name, turno, data, semana, setor, cargo, re },
    };
}
export function addToOperadorSucess(operador) {
    return {
        type: '@operador/ADD_SUCESS',
        payload: { operador },
    };
}
