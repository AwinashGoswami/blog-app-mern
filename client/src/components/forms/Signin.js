import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../store/asyncMethods/AuthMethods'
import './form.css'

const Signin = () => {

    const dispatch = useDispatch();
    const { user, loginErrors = [], loading } = useSelector((state) => state.AuthReducer);
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(signin(state));
    }

    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map((error) => toast.error(error.msg));
        }
        if (user) {
            navigate('/');
        }

    }, [loginErrors])


    return (
        <div>
            <Toaster
                position='bottom-right'
                reverseOrder={false}
            />
            <div className="wrapper">
                <div className="text-center mt-4 name">
                    Sign In
                </div>
                <form className="p-3 mt-3" onSubmit={submitForm}>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="email" name="email" placeholder="Email" value={state.email} onChange={handleInput} />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleInput} />
                    </div>
                    <button className="btn mt-3" type='submit' value={loading ? '...' : 'LOGIN'}>Login</button>
                </form>
                <div className="text-center fs-6">
                    <span>Don't have account?</span> <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Signin