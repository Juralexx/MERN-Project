import { useEffect, useLayoutEffect, useRef } from "react"

export function useScrollToLast(isLoading) {

    const lastmessageRef = useRef()

    useLayoutEffect(() => {
        if (!isLoading) {
            lastmessageRef?.current?.scrollIntoView()
        }
    }, [lastmessageRef?.current, isLoading])

    return { lastmessageRef }
}