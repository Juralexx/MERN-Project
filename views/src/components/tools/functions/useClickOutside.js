import { useCallback, useEffect } from "react";

export function useClickOutside(ref, func, secondFunc, thirdFunc) {

    const handleClickOutside = useCallback((e) => {
        const { current: wrap } = ref
        if (wrap && !wrap.contains(e.target)) {
            func(false)
            if (secondFunc) secondFunc(false)
            if (thirdFunc) thirdFunc(false)
        }
    }, [ref, func, secondFunc, thirdFunc])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])
}