import React, { useEffect } from 'react'
import { BsChatRightTextFill } from 'react-icons/bs'
import { convertDeltaToHTML } from './tools/function'
import { avatar } from './../tools/functions/useAvatar'

const Notification = ({ sentNotification, setSend, send }) => {

    useEffect(() => {
        let interval
        if (send) {
            interval = setInterval(() => { setSend(false) }, 5000)
        } else clearInterval(interval)
        return () => clearInterval(interval)
    }, [send, setSend])

    return (
        Object.keys(sentNotification).length !== 0 && (
            <div className="notification-message">
                <div className="top">
                    <BsChatRightTextFill />
                    <div className="subject">Messages</div>
                    <div className="date">now</div>
                </div>
                <div className="notification-content">
                    <div className="left">
                        <div className="sender">{sentNotification.sender_pseudo}</div>
                        <div className="content" dangerouslySetInnerHTML={convertDeltaToHTML(sentNotification.text[0])}></div>
                    </div>
                    <div className="right" style={avatar(sentNotification.picture)}></div>
                </div>
                <div className="bottom">
                    <button>Répondre</button>
                    <button onClick={() => setSend(false)}>Fermer</button>
                </div>
            </div>
        )
    )
}

export default Notification