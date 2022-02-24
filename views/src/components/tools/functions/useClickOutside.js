import { useCallback, useEffect } from "react";

export function useClickOutside(ref, func, state, secondFunc, secondState, thirdFunc, thirdState) {

    const handleClickOutside = useCallback((e) => {
        const { current: wrap } = ref
        if (wrap && !wrap.contains(e.target)) {
            func(state)
            if (secondFunc) secondFunc(secondState)
            if (thirdFunc) thirdFunc(thirdState)
        }
    }, [ref, func, state, secondFunc, secondState, thirdFunc, thirdState])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])
}