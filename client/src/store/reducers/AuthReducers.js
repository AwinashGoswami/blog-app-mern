
import jwt_decode from 'jwt-decode'
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGIN_ERRORS,
    LOG_OUT
} from '../types/UserTypes';


const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: ''
}

const verifyToken = token => {
    const decodedToken = jwt_decode(token);
    const expiresIn = new Date(decodedToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('myToken');
    }
    else {
        return decodedToken;
    }
    // else {
    //     initState.token = token;
    //     const { user } = decodedToken;
    //     initState.user = user;
    // }
}
const token = localStorage.getItem('myToken');
if (token) {
    const decoded = verifyToken(token);
    initState.token = token;
    const { user } = decoded;
    initState.user = user;
}

const AuthReducer = (state = initState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true };
    }
    else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false }
    }
    else if (action.type === REGISTER_ERRORS) {
        return { ...state, registerErrors: action.payload }
    }
    else if (action.type === SET_TOKEN) {
        const decoded = verifyToken(action.payload);
        const { user } = decoded;
        return {
            ...state,
            token: action.payload,
            user: user,
            loginErrors: [],
            registerErrors: []
        };
    }
    else if (action.type === LOGIN_ERRORS) {
        return { ...state, loginErrors: action.payload }
    }
    else if (action.type === LOG_OUT) {
        return { ...state, token: '', user: '' };
    }
    else {
        return state;
    }
}

export default AuthReducer;