import React from 'react'
import { useDispatch } from 'react-redux'
import { acceptRequest, refuseRequest } from '../../../tools/functions/contact';
import { addClass, fullImage } from '../../../Utils';
import Icon from '../../../tools/icons/Icon';

const ContactRequestCard = ({ notification, websocket, user, setSend }) => {
    const dispatch = useDispatch()

    return (
        <div className={`notification-message ${addClass(notification.type === "contact-request", "active")}`}>
            <div className="top">
                <div className="flex items-center">
                    <Icon name="Group" className="icon" />
                    <div className="subject">Demande d'ami - À l'instant</div>
                </div>
                <div className="close-btn" onClick={() => setSend(false)}>
                    <Icon name="Cross" />
                </div>
            </div>
            {!notification.state &&
                <>
                    <div className="notification-content mt-2">
                        <div className="left" style={fullImage(notification.requesterPicture)}></div>
                        <div className="right">
                            <div className="text-[16px] leading-4"><b>{notification.requester}</b></div>
                            <div className="content">vous à envoyer une invitation</div>
                        </div>
                    </div>
                    <div className="bottom">
                        <button onClick={() => acceptRequest(notification, user, websocket, dispatch)}>Accepter</button>
                        <button onClick={() => refuseRequest(notification, user, websocket, dispatch)}>Refuser</button>
                    </div>
                </>
            }
            {notification.state === "refused" &&
                <div className="notification-content mt-2">
                    <div className="left" style={fullImage(notification.requesterPicture)}></div>
                    <div className="right">
                        <div className="content">Vous avez refuser le demande d'invitation de {notification.requester}</div>
                    </div>
                </div>
            }
            {notification.state === "accepted" &&
                <div className="notification-content mt-2">
                    <div className="left" style={fullImage(notification.requesterPicture)}></div>
                    <div className="right">
                        <div className="content">Vous et {notification.requester} êtes maintenant ami !</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactRequestCard