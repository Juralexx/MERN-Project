import { useLocation, useNavigate } from "react-router-dom";

export function useCheckLocation() {
    const location = useLocation()
    const navigate = useNavigate()

    /**
     * @param {*} param URL param to check
     * @param {*} redirection URL to redirect if param is not present in URL
     */

    async function isParam(param, redirection) {
        if (!location.pathname.includes(param)) {
            navigate(redirection)
        }
    }

    return { isParam }
}