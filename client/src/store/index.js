import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension"
import AuthReducer from "./reducers/AuthReducers";

const rootReducers = combineReducers({
    AuthReducer
})
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)))
export default Store;