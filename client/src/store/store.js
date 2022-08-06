import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import AuthReducer from './reducers/authReducer';
import thunkMiddleware from 'redux-thunk'


const rootReducers = combineReducers({
    AuthReducer,
});
const middlewares = [thunkMiddleware];
const Store = legacy_createStore(
    rootReducers, applyMiddleware(...middlewares)
);
export default Store;
