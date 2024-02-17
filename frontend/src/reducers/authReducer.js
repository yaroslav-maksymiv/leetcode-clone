import {
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_NULL
} from "../constants/authConstants";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    registered: false,
    errors: [],
    loginFail: false,
    passwordResetConfirmed: false,
    passwordResetConfirmedErrors: [],
    passwordReset: null,
}

const createListError = (payload) => {
    let errorsList = []
    for (const [key, values] of Object.entries(payload)) {
        values.forEach(value => {
            errorsList.push(value.charAt(0).toUpperCase() + value.slice(1))
        })
    }
    return errorsList
}

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('isAuthenticated', 'true')
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('isAuthenticated')
            return {
                ...state,
                isAuthenticated: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                registered: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                errors: createListError(payload)
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                loginFail: false,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loginFail: true
            }
        case LOGOUT:
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('editorFontSize')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                registered: false,
                errors: [],
                loginFail: false,
                passwordReset: null,
                passwordResetConfirmed: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
                passwordResetConfirmed: true,
                passwordReset: null,
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state,
                passwordResetConfirmed: false,
                passwordReset: null,
                passwordResetConfirmedErrors: createListError(payload)
            }
        case PASSWORD_RESET_FAIL:
            return {
                ...state,
                passwordReset: false
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordReset: true
            }
        case PASSWORD_RESET_NULL:
            return {
                ...state,
                passwordReset: null
            }
        default:
            return state
    }
}