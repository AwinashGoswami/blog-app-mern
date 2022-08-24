// eslint-disable-next-line
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension"
import AuthReducer from "./reducers/AuthReducers";
import PostRedcuer from "./reducers/PostReducer";


const rootReducers = combineReducers({
    AuthReducer, PostRedcuer
})
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)))
export default Store;