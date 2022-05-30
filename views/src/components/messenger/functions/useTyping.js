import { useEffect, useState } from "react"

export function useTyping(conversation) {
    const [isTyping, setTyping] = useState(false)
    const [typingContext, setTypingContext] = useState({})

    useEffect(() => {
        if (conversation._id) {
            let interval
            if (isTyping && typingContext.conversationId === conversation._id) {
                interval = setInterval(() => {
                    setTyping(false)
                }, 1000)
            } else {
                clearInterval(interval)
            }

            return () => clearInterval(interval)
        }
    }, [isTyping, typingContext, conversation._id])

    return { isTyping, setTyping, typingContext, setTypingContext }
}