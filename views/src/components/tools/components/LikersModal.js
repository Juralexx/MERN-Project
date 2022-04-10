import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import HoverModal from "./HoverModal";
import { Link } from "react-router-dom";
import { MediumAvatar } from "./Avatars"
import { OutlinedButton } from "./Button";
import { IoHeart } from 'react-icons/io5'
import { acceptRequest, cancelRequest, refuseRequest, sendRequest } from "../functions/friend";
import { IoHeartDislike } from "react-icons/io5";

const LikersModal = ({ project, open, setOpen, user, websocket }) => {
    const [liker, setLiker] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const likerFound = project.likers.map(async (likerId) => {
                return await axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${likerId}`)
                    .then((res) => res.data)
                    .catch((err) => console.error(err))
            })
            Promise.all(likerFound).then((res) => setLiker(res))
        } catch (err) { console.log(err) }
    }, [project.likers])

    const findState = (element, user) => {
        if ((user.friend_request_sent
            && !user.friend_request_sent.some(object => object.friend === element._id)
            && !user.friends.some(object => object.friend === element._id)
            && !user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id)
            && element._id !== user._id
        ) || (
                !user.friend_request_sent
                && !user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id)
                && element._id !== user._id
            ) || (
                user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && notif.state === "refused")
                && !user.friend_request_sent.some(object => object.friend === element._id)
                && !user.friends.some(object => object.friend === element._id)
            )) {
            return <OutlinedButton text="Ajouter en ami" onClick={() => sendRequest(element, user, websocket, dispatch)} />
        }

        else if (user.friend_request_sent && user.friend_request_sent.some(object => object.friend === element._id) && element._id !== user._id) {
            return <OutlinedButton text="Annuler ma demande" onClick={() => cancelRequest(element, user, websocket, dispatch)} />
        }

        else if ((user.friends && user.friends.some(object => object.friend === element._id))
            || (user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && notif.state === "accepted"))) {
            return <OutlinedButton text="Vous êtes ami" />
        }

        else if (user.notifications
            && user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && !notif.state)
            && !user.friend_request_sent.some(object => object.friend === element._id)
            && !user.friends.some(object => object.friend === element._id)) {
            return (
                <div className="flex">
                    <OutlinedButton text="Accepter" onClick={() => { acceptRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch); }} />
                    <OutlinedButton text="Refuser" onClick={() => { refuseRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch); }} />
                </div>
            )
        }
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen} css='users-modal'>
                <div className="users-modal-header">
                    <IoHeart className="like" />
                    <p>Soutenu par {project.likers.length} personnes</p>
                </div>
                <div className="users-modal-body">
                    {open && (
                        project.likers.length > 0 ? (
                            <>
                                {liker.map((element, key) => {
                                    return (
                                        <div className="user" key={key} onMouseLeave={() => setHoveredCard(-1)}>
                                            <HoverModal user={element} style={{ display: hoveredCard === key ? 'block' : 'none' }} />
                                            <Link to={"/" + element.pseudo} className="flex" onMouseEnter={() => setHoveredCard(key)} onClick={() => setHoveredCard(key)} >
                                                <MediumAvatar pic={element.picture} />
                                                <p className="pseudo">{element.pseudo}</p>
                                            </Link>

                                            {findState(element, user)}
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <div className="empty-users">
                                <div><IoHeartDislike /></div>
                                <div>Personne n'a encore soutenu ce projet</div>
                            </div>
                        )
                    )}
                </div>
            </Modal>
        </>
    )
}

export default LikersModal;