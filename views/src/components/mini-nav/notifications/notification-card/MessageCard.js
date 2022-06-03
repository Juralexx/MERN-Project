import React from 'react'
import { BsChatRightTextFill } from 'react-icons/bs'
import { convertDeltaToHTML } from '../../../messenger/functions/function'
import { avatar } from '../../../tools/hooks/useAvatar'

const MessageCard = ({ sentNotification, setSend }) => {
    return (
        sentNotification.type === "new-message" && (
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
                    <div className="right" style={avatar(sentNotification.sender_picture)}></div>
                </div>
                <div className="bottom">
                    <button>Répondre</button>
                    <button onClick={() => setSend(false)}>Fermer</button>
                </div>
            </div>
        )
    )
}

export default MessageCard