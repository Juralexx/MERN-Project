import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useRedirection(path, redirection) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === (path || path + '/')) {
            if (redirection) {
                navigate(redirection)
            }
        }
    }, [location, redirection])
}