import React from 'react'
import { acceptRequest, refuseRequest } from '../../../tools/functions/friend';
import { useDispatch } from 'react-redux'
import { Button } from '../../../tools/components/Button'
import { FaUserFriends } from 'react-icons/fa'
import { avatar } from '../../../tools/functions/useAvatar'

const FriendRequestCard = ({ sentNotification, websocket, user }) => {
    const dispatch = useDispatch()

    return (
        <div className="notification-message">
            <div className="top">
                <FaUserFriends />
                <div className="subject">Demande d'ami</div>
                <div className="date">À l'instant</div>
            </div>
            {!sentNotification.state && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{sentNotification.requester}</div>
                            <div className="content">{sentNotification.requester} vous à envoyer une invitation</div>
                        </div>
                        <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom">
                        <Button
                            text="Accepter"
                            className="btn btn-primary"
                            onClick={() => acceptRequest(sentNotification, user, websocket, dispatch)}
                        />
                        <Button
                            text="Refuser"
                            className="btn btn-primary"
                            onClick={() => refuseRequest(sentNotification, user, websocket, dispatch)}
                        />
                    </div>
                </>
            )}
            {sentNotification.state === "accepted" && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{sentNotification.requester}</div>
                            <div className="content">Vous avez refuser le demande d'invitation de {sentNotification.requester}</div>
                        </div>
                        <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom"></div>
                </>
            )}
            {sentNotification.state === "refused" && (
                <>
                    <div className="notification-content">
                        <div className="left">
                            <div className="sender">{sentNotification.requester}</div>
                            <div className="content">Vous et {sentNotification.requester} êtes maintenant ami !</div>
                        </div>
                        <div className="right" style={avatar(sentNotification.requesterPicture)}></div>
                    </div>
                    <div className="flex bottom"></div>
                </>
            )}
        </div>
    )
}

export default FriendRequestCard