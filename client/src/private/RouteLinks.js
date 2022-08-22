
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom';

const RouteLinks = (props) => {
    const { user } = useSelector(state => state.AuthReducer);
    return user ? (
        <Navigate to='/dashboard' />
    ) : (
        <Route exact={props.exact} path={props.path} element={props.element} />
    )


}

export default RouteLinks