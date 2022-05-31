import { useEffect } from "react"

export function useScrollToLast(lastmessageRef, isLoading) {

    useEffect(() => {
        if (!isLoading) {
            lastmessageRef?.current?.scrollIntoView()
        }
    }, [lastmessageRef?.current, isLoading])
}