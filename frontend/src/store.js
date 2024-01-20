import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {authReducer} from "./reducers/authReducer";

const initialStore = {}

const reducers = combineReducers({
    auth: authReducer,
})

const middleware = [thunk]

const store = createStore(reducers, initialStore, composeWithDevTools(applyMiddleware(...middleware)))

export default store