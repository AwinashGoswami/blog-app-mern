import { CLOSE_LOADER, CREATE_ERRORS, SET_LOADER } from "../types/PostTypes";

const initState = {
    loading: false,
    createError: []
}

const PostRedcuer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === SET_LOADER) {
        return { ...state, loading: true }
    }
    else if (type === CLOSE_LOADER) {
        return { ...state, loading: false }
    }
    else if (type === CREATE_ERRORS) {
        return { ...state, createErrors: payload }
    }
    else {
        return state;
    }
}

export default PostRedcuer;