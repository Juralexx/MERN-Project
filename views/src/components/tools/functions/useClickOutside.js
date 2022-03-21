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

export function useButtonClickOutside(ref, secondRef, prevState, func, state, secondFunc, secondState, thirdFunc, thirdState) {

    const handleClickOutside = useCallback((e) => {
        if (prevState !== state) {
            const { current: wrap } = ref
            const { current: secondWrap } = secondRef
            if ((wrap && !wrap.contains(e.target)) && (secondWrap && !secondWrap.contains(e.target))) {
                func(state)
                if (secondFunc) secondFunc(secondState)
                if (thirdFunc) thirdFunc(thirdState)
            }
        }
    }, [ref, secondRef, prevState, func, state, secondFunc, secondState, thirdFunc, thirdState])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])
}

export function clickOn(open, setOpen, key) {
    if (open === key) setOpen(-1)
    else setOpen(key)
}