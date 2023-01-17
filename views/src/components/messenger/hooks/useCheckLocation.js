import { useNavigate } from "react-router-dom"

export function useCheckLocation() {
    const navigate = useNavigate()

    /**
     * @param {*} param URL param to check
     * @param {*} redirection URL to redirect if param is not present in URL
     */

    async function doesLocationIncludesParam(param, redirection) {
        if (!window.location.pathname.includes(param)) {
            return navigate(redirection)
        }
    }

    /**
     * @param {*} param URL param to check
     * @param {*} redirection URL to redirect if param is not present in URL
     */

    async function isExactURL(url, redirection) {
        if (!window.location.pathname === url) {
            return navigate(redirection)
        }
    }

    return { doesLocationIncludesParam, isExactURL }
}