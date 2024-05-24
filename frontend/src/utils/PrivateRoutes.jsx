import {Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token' : (typeof localStorage['jwtToken'] != "undefined")}
    return(
        (auth.token) ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;