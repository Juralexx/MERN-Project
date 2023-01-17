import { useEffect, useState } from "react"

export function useTyping(conversation) {
    const [isTyping, setTyping] = useState({
        state: false,
        context: {}
    })

    useEffect(() => {
        if (conversation._id) {
            let interval
            if (isTyping.state && isTyping.context.conversationId === conversation._id) {
                interval = setInterval(() => {
                    setTyping(prevState => ({ ...prevState, state: true }))
                }, 1000)
            } else {
                clearInterval(interval)
            }

            return () => clearInterval(interval)
        }
    }, [isTyping, conversation._id])

    return { isTyping, setTyping }
}