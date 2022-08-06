import jwt_decode from 'jwt-decode';
import {
    LOGOUT,
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGIN_ERRORS,
} from '../actionTypes/authMethods';



const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: '',
};

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


const getToken = () => {
    let token = getCookie("jwtoken");
    if (token) {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            document.cookie = "jwtoken= ";
            return null;
        } else {
            initState.token = token;
            const { user } = decodeToken;
            initState.user = user;
            return decodeToken;
        }
    }
};

const AuthReducer = (state = initState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true };
    } else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false };
    } else if (action.type === REGISTER_ERRORS) {
        return { ...state, registerErrors: action.payload };
    } else if (action.type === SET_TOKEN) {
        const decoded = getToken(action.payload);
        const { user } = decoded;
        return {
            ...state,
            token: action.payload,
            user: user,
            loginErrors: [],
        };
    } else if (action.type === LOGOUT) {
        return { ...state, token: '', user: '' };
    } else if (action.type === LOGIN_ERRORS) {
        return {
            ...state, loginErrors: action.payload,
        };
    } else {
        return state;
    }
};

export default AuthReducer;