import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ uid, children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!uid) navigate("/")
    }, [uid, navigate])

    return children ? children : <Outlet />
}

export default ProtectedRoute