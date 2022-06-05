import React from 'react'
import { acceptRequest, refuseRequest } from '../../../tools/functions/friend';
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/global/Button'
import { FaUserFriends } from 'react-icons/fa'
import { avatar } from '../../../tools/hooks/useAvatar'

const FriendRequestCard = ({ notification, websocket, user }) => {
    const dispatch = useDispatch()

    return (
        <div className="notification-message">
            <div className="top">
                <FaUserFriends />
                <div className="subject">Demande d'ami</div>
                <div className="date">À l'instant</div>
            </div>
            {!notification.state &&
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">{notification.requester} vous à envoyer une invitation</div>
                        </div>
                        <div className="right" style={avatar(notification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom">
                        <Button
                            text="Accepter"
                            className="btn btn-primary"
                            onClick={() => acceptRequest(notification, user, websocket, dispatch)}
                        />
                        <Button
                            text="Refuser"
                            className="btn btn-primary"
                            onClick={() => refuseRequest(notification, user, websocket, dispatch)}
                        />
                    </div>
                </>
            }
            {notification.state === "accepted" &&
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">Vous avez refuser le demande d'invitation de {notification.requester}</div>
                        </div>
                        <div className="right" style={avatar(notification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom"></div>
                </>
            }
            {notification.state === "refused" &&
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{notification.requester}</div>
                            <div className="content">Vous et {notification.requester} êtes maintenant ami !</div>
                        </div>
                        <div className="right" style={avatar(notification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom"></div>
                </>
            }
        </div>
    )
}

export default FriendRequestCard