import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLastMessageSeen } from "../../../reducers/messenger.action"

export function useLocationchange(user, websocket, currentChat) {
    const dispatch = useDispatch()
    
    const dispatchLastSeen = useCallback(() => {
        if (user.conversations) {
            if (currentChat.messages.length > 0 && currentChat._id)
                dispatch(setLastMessageSeen(user._id, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        }
    }, [user, currentChat, dispatch])

    useEffect(() => {
        window.addEventListener('onbeforeunload', () => {
            dispatchLastSeen()
            websocket.current.emit("leaveMessenger", {
                userId: user._id
            })
        })
    
        window.addEventListener('locationchange', dispatchLastSeen)
    }, [dispatchLastSeen, user._id, websocket])
}