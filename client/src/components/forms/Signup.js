import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { signup } from '../../store/asyncMethods/AuthMethods';


const Signup = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { registerErrors, user } = useSelector(state => state.AuthReducer)

    const [state, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUser({ ...state, [e.target.name]: e.target.value })
    }

    const submitForm = async e => {
        e.preventDefault();
        dispatch(signup(state));
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            { registerErrors.map((error) => toast.error(error.msg)); }
        }
        if (user) {
            navigate('/');
        }
    }, [registerErrors, user])

    return (
        <div>
            <Toaster
                position='bottom-right'
                reverseOrder={false}
            />
            <div className="wrapper">
                <div className="text-center mt-4 name">
                    Sign Up
                </div>
                <form className="p-3 mt-3" onSubmit={submitForm}>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleInput} />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInput} />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInput} />
                    </div>
                    <button className="btn mt-3" type='submit'>Signup</button>
                </form>
                <div className="text-center fs-6">
                    <Link to="/signin" type='submit'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup