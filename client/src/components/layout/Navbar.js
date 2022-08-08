import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LOGOUT } from '../../store/actionTypes/authMethods';


const Navbar = () => {

    const { user } = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem('myToken');
        dispatch({ type: LOGOUT });
    };

    const RenderMenu = () => {
        if (user) {
            return (
                <>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about">About </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact">Contact </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={logout}>Log out </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about">About </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact">Contact </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signin">Sign In </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </>
            )
        }
    }





    return (
        <>
            <RenderMenu />
        </>
    )
}

export default Navbar