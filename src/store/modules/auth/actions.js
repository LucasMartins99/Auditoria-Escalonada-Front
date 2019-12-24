export function loginRequest(email, password) {
    return {
        type: '@auth/LOGIN_REQUEST',
        payload: { email, password },
    };
}

export function loginSuccess(token, user) {
    return {
        type: '@auth/LOGIN_SUCCESS',
        payload: { token, user },
    };
}

export function loginFailure() {
    return {
        type: '@auth/LOGIN_FAILURE',
    };
}

export function createUserRequest() {
    return {
        type: '@auth/CREATE_USER_REQUEST',
    };
}
