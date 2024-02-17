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

const initialState = {
    problemsList: [],
    problemsListLoading: false,
    problemsListError: null,

    savedProblems: [],
    savedProblemsLoading: false,

    problem: {},
    problemLoading: false,
    problemError: null,

    problemCodeSaving: false,
}

export const problemReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case PROBLEMS_SUCCESS:
            return {
                ...state,
                problemsListLoading: false,
                problemsList: payload
            }
        case PROBLEMS_LOADING:
            return {
                ...state,
                problemsListLoading: true
            }
        case PROBLEMS_FAIL:
            return {
                ...state,
                problemsListLoading: false,
                problemsListError: payload
            }
        case PROBLEM_SUCCESS:
            return {
                ...state,
                problemLoading: false,
                problem: payload,
            }
        case PROBLEM_LOADING:
            return {
                ...state,
                problemLoading: true
            }
        case PROBLEM_FAIL:
            return {
                ...state,
                problemLoading: false,
                problemError: payload
            }
        case USER_PROBLEM_CODE_SAVE_LOADING:
            return {
                ...state,
                problemCodeSaving: true
            }
        case USER_PROBLEM_CODE_SAVE_SUCCESS:
        case USER_PROBLEM_CODE_SAVE_FAIL:
            return {
                ...state,
                problemCodeSaving: false
            }
        case PROBLEMS_SAVED_SUCCESS:
            return {
                ...state,
                savedProblems: payload.saved_problems,
                savedProblemsLoading: false
            }
        case PROBLEMS_SAVED_LOADING:
            return {
                ...state,
                savedProblemsLoading: true
            }
        case PROBLEMS_SAVED_FAIL:
            return {
                ...state,
                savedProblems: [],
                savedProblemsLoading: false
            }
        default:
            return state
    }
}