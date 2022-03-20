import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { avatar } from "../functions/useAvatar";
import Modal from "./Modal";
import HoverModal from "./HoverModal";
import { OutlinedButton } from "./Button";
import { IoHeart } from 'react-icons/io5'
import { acceptRequest, cancelRequest, refuseRequest, sendRequest } from "../functions/friend";
import { useDispatch } from "react-redux";

const LikersModal = ({ project, open, setOpen, user, websocket }) => {
    const [liker, setLiker] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()

    useEffect(() => {
        const findLikers = () => {
            try {
                const likerFound = project.likers.map(async (likerId) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${likerId}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(likerFound).then((res) => {
                    setLiker(res)
                })
            }
            catch (err) { console.log(err) }
        }
        findLikers()
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
            return <OutlinedButton className="text-xs" text="Ajouter en ami" onClick={() => sendRequest(element, user, websocket, dispatch)}></OutlinedButton>
        }

        else if (user.friend_request_sent && user.friend_request_sent.some(object => object.friend === element._id) && element._id !== user._id) {
            return <OutlinedButton className="text-xs" text="Annuler ma demande" onClick={() => cancelRequest(element, user, websocket, dispatch)}></OutlinedButton>
        }

        else if ((user.friends && user.friends.some(object => object.friend === element._id))
            || (user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && notif.state === "accepted"))) {
            return <OutlinedButton className="text-xs" text="Vous êtes ami"></OutlinedButton>
        }

        else if (user.notifications
            && user.notifications.some(notif => notif.type === "friend-request" && notif.requesterId === element._id && !notif.state)
            && !user.friend_request_sent.some(object => object.friend === element._id)
            && !user.friends.some(object => object.friend === element._id)) {
            return (
                <div className="flex">
                    <OutlinedButton className="text-xs" text="Accepter" onClick={() => { acceptRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch); }}></OutlinedButton>
                    <OutlinedButton className="text-xs" text="Refuser" onClick={() => { refuseRequest(user.notifications.find(notif => notif.type === "friend-request" && notif.requesterId === element._id), user, websocket, dispatch); }}></OutlinedButton>
                </div>
            )
        }
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen} css='bg-background_primary text-slate-300'>
                <div className="flex pb-2 border-b border-slate-300/20">
                    <IoHeart className="w-6 h-6 text-primary mr-1" />
                    <p>Suivi par {project.likers.length} personnes</p>
                </div>
                <div className="py-2">
                    {open && (
                        project.likers.length > 0 ? (
                            <>
                                {liker.map((element, key) => (
                                    <div className="min-w-[300px]" key={key}>
                                        <div className="py-2 relative flex justify-between w-full cursor-pointer"
                                            onMouseLeave={() => setHoveredCard(-1)}
                                        >
                                            <HoverModal user={element} style={{ display: hoveredCard === key ? 'block' : 'none' }} />
                                            <NavLink
                                                to={"/" + element.pseudo}
                                                className="flex"
                                                onMouseEnter={() => setHoveredCard(key)}
                                                onClick={() => setHoveredCard(key)}
                                            >
                                                <div className="w-9 h-9 rounded-full" style={avatar(element.picture)}></div>
                                                <p className="flex items-center ml-2">{element.pseudo}</p>
                                            </NavLink>

                                            {findState(element, user)}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Personne n'a encore soutenu ce projet</p>)
                    )}
                </div>
            </Modal>
        </>
    )
}

export default LikersModal;