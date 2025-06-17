//frontend file to protect some routes so that the user cant access without login
//the route access should be wrapped in this route in index/app.js
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () =>{
    const auth = localStorage.getItem("token");
    return auth && auth !== null ? <Outlet/> : <Navigate to="/login"/>
}
 
export default PrivateRoute;
