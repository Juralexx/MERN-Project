import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const localStorageAuth = localStorage.getItem("auth")

    return (
        localStorageAuth ? (
            children ? children : <Outlet />
        ) : (
            window.location.pathname = '/'
        )
    )
}

export default ProtectedRoute