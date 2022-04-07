import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ uid, children }) => {
    const navigate = useNavigate()

    if (!uid) navigate("/")
    return children ? children : <Outlet />
}

export default ProtectedRoute