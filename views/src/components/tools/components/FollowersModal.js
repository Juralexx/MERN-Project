import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "../icons/Icon";
import Modal from "../global/Modal";
import HoverModal from "./HoverModal";
import { TextButton } from "../global/Button";
import { MediumAvatar } from "../global/Avatars";
import { acceptRequest, cancelRequest, refuseRequest, sendRequest } from "../functions/contact";

const FollowersModal = ({ project, user, websocket, open, setOpen }) => {
    const [followers, setFollowers] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()

    useEffect(() => {
        if (open) {
            try {
                const followerFound = project.followers.map(async followerId => {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${followerId}`)
                        .then(res => res.data)
                        .catch(err => console.error(err))
                })
                Promise.all(followerFound).then(res => {
                    setFollowers(res)
                })
            } catch (err) {
                console.log(err)
            }
        }
    }, [project.followers, open])

    const findState = (element, user) => {
        if (
            (user.contact_request_sent
                && !user.contact_request_sent.some(object => object.contact === element._id)
                && !user.contacts.some(object => object._id === element._id)
                && !user.notifications.some(notif => notif.type === "contact-request" && notif.requesterId === element._id)
                && element._id !== user._id
            ) || (
                !user.contact_request_sent
                && !user.notifications.some(notif => notif.type === "contact-request" && notif.requesterId === element._id)
                && element._id !== user._id
            ) || (
                user.notifications.some(notif => notif.type === "contact-request" && notif.requesterId === element._id && notif.state === "refused")
                && !user.contact_request_sent.some(object => object.contact === element._id)
                && !user.contacts.some(object => object._id === element._id)
            )
        ) {
            return (
                <TextButton en ami onClick={() => sendRequest(element, user, websocket, dispatch)}>
                    Ajouter en ami
                </TextButton>
            )
        }

        else if (
            user.contact_request_sent &&
            user.contact_request_sent.some(object => object.contact === element._id) &&
            element._id !== user._id
        ) {
            return (
                <TextButton onClick={() => cancelRequest(element, user, websocket, dispatch)}>
                    Annuler ma demande
                </TextButton>
            )
        }

        else if (
            (user.contacts &&
                user.contacts.some(object => object._id === element._id)
            ) || (
                user.notifications.some(notif => notif.type === "contact-request" && notif.requesterId === element._id && notif.state === "accepted")
            )
        ) {
            return <TextButton>Ami</TextButton>
        }

        else if (
            user.notifications
            && user.notifications.some(notif => notif.type === "contact-request" && notif.requesterId === element._id && !notif.state)
            && !user.contact_request_sent.some(object => object.contact === element._id)
            && !user.contacts.some(object => object._id === element._id)
        ) {
            return (
                <div className="flex">
                    <TextButton onClick={() => {
                        acceptRequest(user.notifications.find(notif => notif.type === "contact-request" && notif.requesterId === element._id), user, websocket, dispatch)
                    }}>
                        Accepter
                    </TextButton>
                    <TextButton onClick={() => {
                        refuseRequest(user.notifications.find(notif => notif.type === "contact-request" && notif.requesterId === element._id), user, websocket, dispatch)
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
                <Icon name="Bookmark" />
                <p>Suivi par {project.followers.length} personnes</p>
            </div>
            <div className="users_modal-body">
                {open &&
                    project.followers.length > 0 ? (
                    <>
                        {followers.map((element, key) => {
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
                        <Icon name="Bookmark" />
                        <div>Personne n'a encore suivi ce projet</div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default FollowersModal;