
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'


const PrivateRoute = (props) => {

    const { user } = useSelector(state => state.AuthReducer);
    return user ? <Route exact={props.eaxct} path={props.path} element={<props.element />} />
        :
        <Navigate to='/signin' />

}

export default PrivateRoute