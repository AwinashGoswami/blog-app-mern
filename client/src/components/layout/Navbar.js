import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../../store/types/UserTypes';


const Navbar = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('myToken');
        dispatch({ type: LOG_OUT });
        navigate('/signin');
    }
 
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
                                    <Link className="nav-link logout" to='/create'>Create Post</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link logout" onClick={logout}>Logout </a>
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



export default Navbar