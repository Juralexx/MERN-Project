import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Modal from "../global/Modal";
import HoverModal from "./HoverModal";
import { Link } from "react-router-dom";
import { MediumAvatar } from "../global/Avatars"
import { TextButton } from "../global/Button";
import { acceptRequest, cancelRequest, refuseRequest, sendRequest } from "../functions/friend";
import Icon from "../icons/Icon";

const LikersModal = ({ project, open, setOpen, user, websocket }) => {
    const [liker, setLiker] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const likerFound = project.likers.map(async likerId => {
                return await axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${likerId}`)
                    .then(res => res.data)
                    .catch(err => console.error(err))
            })
            Promise.all(likerFound).then(res => {
                setLiker(res)
            })
        } catch (err) {
            console.log(err)
        }
    }, [project.likers])

    const findState = (element, user) => {
        if (
            (user.friend_request_sent &&
                !user.friend_request_sent.some(object => object.friend === element._id) &&
                !user.friends.some(object => object.friend === element._id) &&
                !user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id) &&
                element._id !== user._id
            ) || (
                !user.friend_request_sent &&
                !user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id) &&
                element._id !== user._id
            ) || (
                user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && notif.state === "refused") &&
                !user.friend_request_sent.some(object => object.friend === element._id) &&
                !user.friends.some(object => object.friend === element._id)
            )
        ) {
            return (
                <TextButton onClick={() => sendRequest(element, user, websocket, dispatch)}>
                    Ami
                </TextButton>
            )
        }
        else if (
            user.friend_request_sent &&
            user.friend_request_sent.some(object => object.friend === element._id) &&
            element._id !== user._id
        ) {
            return (
                <TextButton onClick={() => cancelRequest(element, user, websocket, dispatch)}>
                    Annuler ma demande
                </TextButton>
            )
        }
        else if (
            (user.friends &&
                user.friends.some(object => object.friend === element._id)
            ) || (
                user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && notif.state === "accepted")
            )
        ) {
            return <TextButton>Ami</TextButton>
        }
        else if (
            user.notifications &&
            user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && !notif.state) &&
            !user.friend_request_sent.some(object => object.friend === element._id) &&
            !user.friends.some(object => object.friend === element._id)
        ) {
            return (
                <div className="flex">
                    <TextButton onClick={() => {
                        acceptRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch)
                    }}>
                        Accepter
                    </TextButton>
                    <TextButton onClick={() => {
                        refuseRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch)
                    }}>
                        Refuser
                    </TextButton>
                </div>
            )
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} className='users_modal'>
            <div className="users_modal-header">
                <Icon name="Like" />
                <p>Soutenu par {project.likers.length} personnes</p>
            </div>
            <div className="users_modal-body">
                {open &&
                    project.likers.length > 0 ? (
                    <>
                        {liker.map((element, key) => {
                            return (
                                <div className="user" key={key} onMouseLeave={() => setHoveredCard(-1)}>
                                    <HoverModal
                                        user={element}
                                        open={hoveredCard === key}
                                    />
                                    <Link
                                        to={"/" + element.pseudo}
                                        className="flex"
                                        onMouseEnter={() => setHoveredCard(key)}
                                        onClick={() => setHoveredCard(key)}
                                    >
                                        <MediumAvatar pic={element.picture} />
                                        <p className="pseudo">{element.pseudo}</p>
                                    </Link>

                                    {findState(element, user)}
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <div className="empty_users">
                        <Icon name="Like" />
                        <div>Personne n'a encore soutenu ce projet</div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default LikersModal;