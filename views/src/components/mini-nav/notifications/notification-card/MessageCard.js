import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addClass, fullImage } from '../../../Utils'
import { convertDeltaToHTML } from '../../../messenger/functions'
import { setLastMessageSeen } from '../../../../reducers/messenger.action'
import ToolsMenu from '../../../tools/global/ToolsMenu'
import Icon from '../../../tools/icons/Icon'

const MessageCard = ({ notification, user, setSend }) => {
    const [name, setName] = useState('Message')
    const dispatch = useDispatch()

    const setSeen = () => {
        dispatch(setLastMessageSeen(user._id, notification.conversationId, notification._id))
    }

    useEffect(() => {
        if (notification.conversationId) {
            const fetch = async () => {
                await axios
                    .get(`${process.env.REACT_APP_API_URL}api/conversation/${notification.conversationId}`)
                    .then(res => {
                        if (res.data.name) setName(res.data.name)
                    })
                    .catch(err => console.error(err))
            }
            fetch()
        }
    }, [notification])

    return (
        <div className={`notification-message ${addClass(notification.type === "new-message", "active")}`}>
            <div className="top">
                <div className="flex items-center">
                    <Icon name="Message" className="icon" />
                    <div className="subject">{name} - À l'instant</div>
                </div>
                <ToolsMenu>
                    <div className="tools_choice" onClick={setSeen}>Marquer comme lu</div>
                    <div className="tools_choice">Désactiver les notifications</div>
                </ToolsMenu>
                <div className="close-btn">
                    <Icon name="Cross" />
                </div>
            </div>
            <div className="notification-content">
                <div className="left" style={fullImage(notification.sender_picture)}></div>
                <div className="right">
                    <div className="sender">{notification.sender_pseudo}</div>
                    <div className="content" dangerouslySetInnerHTML={convertDeltaToHTML(notification)}></div>
                </div>
            </div>
            <div className="bottom">
                <button>Répondre</button>
                <button onClick={() => setSend(false)}>Fermer</button>
            </div>
        </div>
    )
}

export default MessageCard