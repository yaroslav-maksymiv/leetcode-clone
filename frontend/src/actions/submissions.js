import axios from "axios"

import {
    SUBMISSION_SUCCESS,
    SUBMISSION_FAIL,
    SUBMISSIONS_GET_FAIL,
    SUBMISSIONS_GET_SUCCESS,
    SUBMISSIONS_GET_LOADING
} from '../constants/submissionCostants'

export const makeSubmission = (problemId, languageId, isAccepted) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const data = {
        problem: problemId,
        language: languageId,
        accepted: isAccepted
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submissions/`, data, config)

        dispatch({type: SUBMISSION_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: SUBMISSION_FAIL, payload: e.message})
    }
}

export const submissionsGet = (problemId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    dispatch({type: SUBMISSIONS_GET_LOADING})
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/submissions/?problem=${problemId}`, config)

        dispatch({type: SUBMISSIONS_GET_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: SUBMISSIONS_GET_FAIL, payload: e.message})
    }
}