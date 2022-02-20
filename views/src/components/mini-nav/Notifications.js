import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UidContext } from '../AppContext';
import { acceptFriendRequest, refuseFriendRequest } from "../../actions/user.action";
import formatDistance from 'date-fns/formatDistance'
import fr from 'date-fns/locale/fr'
import { avatar } from "../tools/functions/useAvatar";

const NotificationsMenu = () => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [futureFriend, setFutureFriend] = useState([])
    const [friendsRequests, setFriendsRequests] = useState([])
    const [accepted, setAccepted] = useState(false)
    const [refused, setRefused] = useState(false)

    useEffect(() => {
        const findFriendsRequests = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                if (data.friend_request) {
                    setFriendsRequests(data.friend_request)
                    const requests = data.friend_request

                    const friendsFound = requests.map(async (friendId) => {
                        return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${friendId['friend']}`)
                            .then((res) => res.data)
                            .catch((err) => console.error(err))
                    })
                    Promise.all(friendsFound).then((res) => {
                        setFutureFriend(res)
                    })
                }
            }
            catch (err) { console.log(err) }
        }
        findFriendsRequests()
    }, [])


    return (
        <div className="right-menu">
            <h2>Notifications</h2>
            {futureFriend.length !== 0 && (
                futureFriend.map((element, key) => {
                    return (
                        <div className="notification-card" key={key}>
                            <div className="left">
                                <NavLink to={'/' + element.pseudo}><div className="avatar" style={avatar(element.picture)}></div></NavLink>
                            </div>
                            <div className="right">
                                {!accepted && !refused && (
                                    <div className="body">
                                        <p><strong><NavLink to={'/' + element.pseudo}>{element.pseudo}</NavLink></strong> vous a envoyé une demande d'ami<br />
                                            {friendsRequests.map((object, key) => {
                                                if (object.friend === element._id)
                                                    return (
                                                        <span key={key}>il y a {formatDistance(new Date(object.requestedAt), new Date(), { locale: fr })}</span>
                                                    )
                                            })}
                                        </p>

                                        <button className="btn btn-primary" onClick={() => {
                                            dispatch(acceptFriendRequest(element._id, uid))
                                            setAccepted(true)
                                        }}>Accepter</button>
                                        <button className="btn btn-secondary" onClick={() => {
                                            dispatch(refuseFriendRequest(element._id, uid))
                                            setRefused(true)
                                        }}>Refuser</button>
                                    </div>
                                )}
                                {accepted && (
                                    <div className="body">
                                        <p><strong><NavLink to={'/' + element.pseudo}>{element.pseudo}</NavLink></strong> et vous êtes maintenant ami</p>
                                    </div>
                                )}
                                {refused && (
                                    <div className="body">
                                        <p><strong>Vous avez refusé la demande d'ami de <NavLink to={'/' + element.pseudo}>{element.pseudo}</NavLink></strong></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            )}
            {futureFriend.length === 0 && (
                <p>Vous n'avez pas de nouvelles notifications</p>
            )}
        </div>
    )
}

export default NotificationsMenu;