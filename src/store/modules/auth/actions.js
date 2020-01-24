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

export function createUserRequest(data) {
    return {
        type: '@auth/CREATE_USER_REQUEST',
        payload: { data },
    };
}
export function createUserFailure() {
    return {
        type: '@auth/CREATE_USER_FAILURE',
    };
}
export function addToUserSuccess(data) {
    return {
        type: '@auth/ADD_TO_USER_SUCCESS',
        payload: { data },
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
