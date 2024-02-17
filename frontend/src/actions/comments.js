import {COMMENT_DELETE, COMMENTS_FAIL, COMMENTS_LOADING, COMMENTS_SUCCESS} from "../constants/commentConstants"

import axios from "axios";

export const loadComments = (problemId, page=1, pageSize=10, orderBy='-created_at') => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    if (localStorage.getItem('isAuthenticated') === 'true') {
        config['headers']['Authorization'] = `JWT ${localStorage.getItem('access')}`
    }

    let queryString = `?page=${page}&page_size=${pageSize}&problem=${problemId}&order_by=${orderBy}`

    dispatch({type: COMMENTS_LOADING})
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${queryString}`, config)

        dispatch({type: COMMENTS_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: COMMENTS_FAIL, payload: e.message})
    }
}

export const loadReplies = async (parentId, page=1, pageSize=5) => {
    const config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    if (localStorage.getItem('isAuthenticated') === 'true') {
        config['headers']['Authorization'] = `JWT ${localStorage.getItem('access')}`
    }

    let queryString = `?page=${page}&page_size=${pageSize}&parent=${parentId}&order_by=-created_at`

    try {
        return await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${queryString}`, config)
    } catch (e) {
        return e
    }
}

export const deleteComment = async (commentId) => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}/`, config)
    } catch (e) {
        return e
    }
}

export const sendComment = async (problemId, content, parentId) => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const data = {
        content: content,
        problem: problemId
    }
    if (parentId) {
        data['parent'] = parentId
    }

    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/`, data, config)
    } catch (e) {
        return e
    }
}

export const toggleCommentLike = async (commentId) => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}/like/`, {}, config)
    } catch (e) {
        return e
    }
}

export const toggleCommentDislike = async (commentId) => {
    const config = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}/dislike/`, {}, config)
    } catch (e) {
        return e
    }
}

export const removeComment = (commentId) => dispatch => {
    dispatch({type: COMMENT_DELETE, payload: commentId})
}