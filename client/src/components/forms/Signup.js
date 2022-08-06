import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SignUpController } from '../../store/actions/authMethod'
import './form.css'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {

    const dispatch = useDispatch();
    const { registerErrors = [] } = useSelector((state) => state.AuthReducer)

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(SignUpController(user));
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            registerErrors.map((error) => toast.error(error.msg));
        }
    }, [registerErrors])


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