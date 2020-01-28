export function signInRequest(key) {
    return {
        type: "@auth/SIGN_IN_REQUEST",
        payload: { key }
    };
}

export function signInSuccess() {
    return {
        type: "@auth/SIGN_IN_SUCCESS"
    };
}

export function signFailure() {
    return {
        type: "@auth/SIGN_FAILURE"
    };
}