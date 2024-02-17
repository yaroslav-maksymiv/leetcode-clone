import {
    SUBMISSION_SUCCESS,
    SUBMISSION_FAIL,
    SUBMISSIONS_GET_FAIL,
    SUBMISSIONS_GET_SUCCESS,
    SUBMISSIONS_GET_LOADING
} from '../constants/submissionCostants'

const initialState = {
    submission: {},
    submissions: [],
    status: null,
    error: null,
    loading: false,
}

export const submissionReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case SUBMISSION_SUCCESS:
            return {
                ...state,
                submission: payload
            }
        case SUBMISSION_FAIL:
            return {
                ...state,
                error: payload,
                submission: {}
            }
        case SUBMISSIONS_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                submissions: payload,
                submission: {}
            }
        case SUBMISSIONS_GET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SUBMISSIONS_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                submissions: [],
                submission: {}
            }
        default:
            return state
    }
}