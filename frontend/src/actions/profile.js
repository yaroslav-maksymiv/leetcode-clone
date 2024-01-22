import axios from 'axios'

import {loadUser} from "./auth";
import {PROFILE_UPDATE_FAIL, PROFILE_UPDATE_SUCCESS} from "../constants/profileConstants";
import {isBase64} from "../misc";

export const profileUpdate = (editedUser) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const formData = new FormData()
    formData.append('username', editedUser.username)
    formData.append('email', editedUser.email)
    formData.append('first_name', editedUser.first_name)
    formData.append('last_name', editedUser.last_name)
    formData.append('gender', editedUser.gender)
    formData.append('summary', editedUser.summary)
    formData.append('birthday', editedUser.birthday)

    if (isBase64(editedUser.photo)) {
        const blob = await fetch(editedUser.photo).then((res) => res.blob())
        formData.append('photo', blob, `${editedUser.username}_photo.jpg`)
    }

    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/me/`, formData, config)

        dispatch({type: PROFILE_UPDATE_SUCCESS})
        dispatch(loadUser())
    } catch (e) {
        dispatch({type: PROFILE_UPDATE_FAIL, payload: e.response.data})
    }
}