import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {authReducer} from "./reducers/authReducer";
import {profileReducer} from "./reducers/profileReducers";
import {problemReducer} from "./reducers/problemReducer";
import {submissionReducer} from "./reducers/submissionReducer";
import {commentReducers} from "./reducers/commentReducers";

const initialStore = {}

const reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    problem: problemReducer,
    submission: submissionReducer,
    comment: commentReducers,
})

const middleware = [thunk]

const store = createStore(reducers, initialStore, composeWithDevTools(applyMiddleware(...middleware)))

export default store