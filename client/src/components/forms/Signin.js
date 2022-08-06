import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SigninController } from '../../store/actions/authMethod'
import './form.css'

const Signin = () => {

    const dispatch = useDispatch();
    const { loginErrors = [] } = useSelector((state) => state.AuthReducer);

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(SigninController(user));
    }

    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map((error) => toast.error(error.msg));
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
                        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInput} />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInput} />
                    </div>
                    <button className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">
                    <span>Don't have account?</span> <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Signin