import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useCheckLocation() {
    const location = useLocation()
    const navigate = useNavigate()

    /**
     * @param {*} param URL param to check
     * @param {*} redirection URL to redirect if param is not present in URL
     */

    function isParam(param, redirection) {
        if (location.pathname.includes(param)) {
            return
        } else navigate(redirection)
    }

    return { isParam }
}