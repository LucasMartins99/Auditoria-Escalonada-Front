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
