import {
    COMMENTS_SUCCESS,
    COMMENTS_LOADING,
    COMMENTS_FAIL,
    COMMENT_DELETE
} from "../constants/commentConstants"

const initialState = {
    comments: [],
    loading: false,
    error: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    total: null,
}

export const commentReducers = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case COMMENTS_SUCCESS:
            return {
                ...state,
                comments: payload.results,
                currentPage: payload.page,
                total: payload.total,
                loading: false,
                nextPage: payload.links?.next,
                prevPage: payload.links?.previous
            }
        case COMMENTS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case COMMENTS_FAIL:
            return {
                ...state,
                error: payload,
                comments: [],
                loading: false,
                nextPage: null,
                prevPage: null,
                total: null
            }
        case COMMENT_DELETE:
            let updatedComments = state.comments.filter(comment => comment.id !== payload)
            return {
                ...state,
                comments: updatedComments
            }
        default:
            return {
                ...state
            }
    }
}