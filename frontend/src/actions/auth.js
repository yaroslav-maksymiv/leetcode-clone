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

import axios from 'axios'

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })
        } catch (e) {
            dispatch({type: USER_LOADED_FAIL})
        }
    } else {
        dispatch({type: USER_LOADED_FAIL})
    }
}

export const checkUserAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (response.data.code !== 'token_not_valid') {
                dispatch({type: AUTHENTICATED_SUCCESS})
            } else {
                dispatch({type: AUTHENTICATED_FAIL})
            }
        } catch (e) {
            dispatch({type: AUTHENTICATED_FAIL})
        }
    } else {
        dispatch({type: AUTHENTICATED_FAIL})
    }
}

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        username,
        password
    })

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
        dispatch(loadUser())
    } catch (e) {
        dispatch({type: LOGIN_FAIL})
    }
}

export const register = (username, password, rePassword, email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        'username': username,
        'email': email,
        'password': password,
        're_password': rePassword
    })

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        dispatch({type: REGISTER_SUCCESS, payload: response})
    } catch (e) {
        dispatch({type: REGISTER_FAIL, payload: e.response.data})
    }
}

export const resetPassword = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email})

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch({type: PASSWORD_RESET_SUCCESS})
    } catch (e) {
        dispatch({type: PASSWORD_RESET_FAIL})
    }
}

export const resetPasswordConfirm = (uid, token, newPassword, reNewPassword) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        uid, token, new_password: newPassword, re_new_password: reNewPassword
    })

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({type: PASSWORD_RESET_CONFIRM_SUCCESS})
    } catch (e) {
        dispatch({type: PASSWORD_RESET_CONFIRM_FAIL, payload: e.response.data})
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}

export const passwordResetNull = () => dispatch => {
    dispatch({type: PASSWORD_RESET_NULL})
}