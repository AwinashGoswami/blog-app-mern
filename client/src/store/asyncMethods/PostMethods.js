import axios from 'axios'
import { CLOSE_LOADER, SET_LOADER, CREATE_ERRORS } from '../types/PostTypes';
const token = localStorage.getItem('myToken');
export const createAction = (postData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.post('/create_post', postData, config);
            dispatch({ type: CLOSE_LOADER })
            console.log(data);
        } catch (error) {
            const { errors } = error.response.data;
            console.log(error.response);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: CREATE_ERRORS, payload: errors })

        }
    }
}