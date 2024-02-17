import axios from "axios";
import {
    PROBLEMS_SUCCESS,
    PROBLEMS_FAIL,
    PROBLEMS_LOADING,
    PROBLEM_SUCCESS,
    PROBLEM_LOADING,
    PROBLEM_FAIL,
    USER_PROBLEM_CODE_SAVE_SUCCESS,
    USER_PROBLEM_CODE_SAVE_LOADING,
    USER_PROBLEM_CODE_SAVE_FAIL,
    PROBLEMS_SAVED_SUCCESS,
    PROBLEMS_SAVED_LOADING,
    PROBLEMS_SAVED_FAIL
} from '../constants/problemConstants'

export const loadProblemsList = (details) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (localStorage.getItem('isAuthenticated')) {
        config['headers']['Authorization'] = `JWT ${localStorage.getItem('access')}`
    }

    const formBody = Object.keys(details).map(key => {
        if (details[key]) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        } else {
            return encodeURIComponent(key) + "="
        }
    }).join('&')

    dispatch({type: PROBLEMS_LOADING})
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/problems/?${formBody}`, config)

        dispatch({
            type: PROBLEMS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({type: PROBLEMS_FAIL, payload: e.message})
    }
}

export const loadProblem = (problemId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (localStorage.getItem('isAuthenticated')) {
        config['headers']['Authorization'] = `JWT ${localStorage.getItem('access')}`
    }

    dispatch({type: PROBLEM_LOADING})
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/problems/${problemId}/`, config)

        dispatch({
            type: PROBLEM_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({type: PROBLEM_FAIL, payload: e.message})
    }
}

export const loadUserProblemCode = async (problemId, languageId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-code/${problemId}/?language=${languageId}`, config)
        return response
    } catch (e) {
        return e.message
    }
}

export const saveUserProblemCode = (problemId, languageId, code) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const data = {
        problem: problemId,
        language: languageId,
        code: code
    }

    dispatch({type: USER_PROBLEM_CODE_SAVE_LOADING})
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/my-code/`, data, config)
        setTimeout(() => {
            dispatch({
                type: USER_PROBLEM_CODE_SAVE_SUCCESS,
                payload: response.data
            })
        }, 500)
    } catch (e) {
        dispatch({type: USER_PROBLEM_CODE_SAVE_FAIL})
    }
}

export const getRandomProblem = async (details) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const formBody = Object.keys(details).map(key => {
        if (details[key]) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        } else {
            return encodeURIComponent(key) + "="
        }
    }).join('&')

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/problem-random/?${formBody}`, config)
        return response
    } catch (e) {
        return e
    }
}

export const toggleProblemToSaved = async (problemId, saved) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        if (saved) {
            return await axios.post(`${process.env.REACT_APP_API_URL}/api/problems-saved/${problemId}/add/`, {}, config)
        } else {
            return await axios.delete(`${process.env.REACT_APP_API_URL}/api/problems-saved/${problemId}/delete/`, config)
        }

    } catch (e) {
        return e
    }
}

export const toggleLike = async (problemId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/problems/${problemId}/like/`, {}, config)
    } catch (e) {
        return e
    }
}

export const toggleDislike = async (problemId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/problems/${problemId}/dislike/`, {}, config)
    } catch (e) {
        return e
    }
}

export const loadSavedProblems = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    dispatch({type: PROBLEMS_SAVED_LOADING})
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/problems-saved/`, config)

        dispatch({
            type: PROBLEMS_SAVED_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({type: PROBLEMS_SAVED_FAIL, payload: e.message})
    }
}

export const deleteFromSavedProblems = async (problemId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.delete(`${process.env.REACT_APP_API_URL}/api/problems-saved/${problemId}/delete/`, config)
    } catch (e) {
        return e
    }
}

export const getProblemStatus = async (problemId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}/api/problems/${problemId}/status/`, config)
    } catch (e) {
        return e
    }
}