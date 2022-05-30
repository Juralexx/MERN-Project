import { useEffect } from "react"

export function useScrollToLast(lastMessageRef) {

    useEffect(() => {
        lastMessageRef?.current?.scrollIntoView()
    }, [lastMessageRef])
}