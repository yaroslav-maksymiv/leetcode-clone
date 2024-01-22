import {PROFILE_UPDATE_FAIL, PROFILE_UPDATE_SUCCESS} from "../constants/profileConstants";

const initialState = {

}

export const profileReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case PROFILE_UPDATE_SUCCESS:
            return {...state}
        case PROFILE_UPDATE_FAIL:
            return {...state}
        default:
            return state
    }
}