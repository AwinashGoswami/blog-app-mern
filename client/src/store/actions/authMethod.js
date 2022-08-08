
import axios from 'axios'
import {
    CLOSE_LOADER,
    LOGIN_ERRORS,
    REGISTER_ERRORS,
    SET_LOADER,
    SET_TOKEN
} from '../actionTypes/authMethods';

export const SignUpController = (user) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch({ type: SET_LOADER });
        try {
            const data  = await axios.post('/signup', user, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('myToken', data.myToken);
            dispatch({ type: SET_TOKEN, payload: data.myToken });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({
                type: REGISTER_ERRORS,
                payload: error.data,
            });
        }
    };
}

export const SigninController = (user) => {
    return async (dispatch) => {
        try {
            const config = { Headers: { 'content-type': 'application/json' } };
            dispatch({ type: SET_LOADER });
            const { signin_User } = await axios.post('/signin', user, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_TOKEN, payload: signin_User.myToken });
            if (signin_User) {
                alert('Log in Success')
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERRORS,
                payload: error.response.data.errors
            });
            console.log(error.response.data.errors);
        }
    }
}



