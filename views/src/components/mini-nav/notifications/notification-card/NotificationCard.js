import React, { useEffect } from 'react'
import ContactRequestCard from './ContactRequestCard'
import MemberRequestCard from './MemberRequestCard'
import MessageCard from './MessageCard'

const NotificationCard = ({ notification, setSend, send, user, websocket }) => {

    useEffect(() => {
        let interval
        if (send) {
            interval = setInterval(() => { setSend(false) }, 5000)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [send, setSend])

    return (
        Object.keys(notification).length > 0 && send && (
            <>
                {notification.type === "new-message" &&
                    <MessageCard
                        user={user}
                        notification={notification}
                        setSend={setSend}
                    />
                }
                {notification.type === "contact-request" &&
                    <ContactRequestCard
                        user={user}
                        websocket={websocket}
                        notification={notification}
                        setSend={setSend}
                    />
                }
                {notification.type === "project-member-request" &&
                    <MemberRequestCard
                        user={user}
                        websocket={websocket}
                        notification={notification}
                        setSend={setSend}
                    />
                }
            </>
        )
    )
}

export default NotificationCard