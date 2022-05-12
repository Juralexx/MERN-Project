import React, { useEffect } from 'react'
import FriendRequestCard from './FriendRequestCard'
import MemberRequestCard from './MemberRequestCard'
import MessageCard from './MessageCard'

const NotificationCard = ({ sentNotification, setSend, send, user, websocket }) => {

    useEffect(() => {
        let interval
        if (send) {
            interval = setInterval(() => { setSend(false) }, 5000)
        } else clearInterval(interval)
        return () => clearInterval(interval)
    }, [send, setSend])

    return (
        Object.keys(sentNotification).length !== 0 && (
            <>
                {sentNotification.type === "new-message" &&
                    <MessageCard sentNotification={sentNotification} setSend={setSend} />
                }
                {sentNotification.type === "friend-request" &&
                    <FriendRequestCard sentNotification={sentNotification} websocket={websocket} user={user} />
                }
                {sentNotification.type === "project-member-request" &&
                    <MemberRequestCard sentNotification={sentNotification} websocket={websocket} user={user} />
                }
            </>
        )
    )
}

export default NotificationCard