import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { UidContext, UserContext } from '../../AppContext';
import HoverModal from "./HoverModal";
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { IoHeart } from 'react-icons/io5'
import Modal from "./Modal";
import { OutlinedButton } from "./Button";
import { avatar } from "../functions/useAvatar";
import { io } from 'socket.io-client'

const LikersModal = ({ project, open, setOpen, websocket }) => {
    const user = useContext(UserContext)
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [liker, setLiker] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()
    websocket.current = io('ws://localhost:3001')

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

    const sendRequest = (element) => {
        const notification = {
            type: "friend-request",
            requesterId: user._id,
            requester: user.pseudo,
            requesterPicture: user.picture,
            date: new Date().toISOString(),
            seen: false,
            accepted: false,
        }
        websocket.current.emit("friendRequestNotification", {
            type: "friend-request",
            requesterId: user._id,
            requester: user.pseudo,
            requesterPicture: user.picture,
            date: new Date().toISOString(),
            receiverId: element._id
        })
        dispatch(sendFriendRequest(element._id, uid, notification))
    }

    const cancelRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: user._id,
            receiverId: element._id
        })
        dispatch(cancelSentFriendRequest(element._id, uid, "friend-request"))
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
                                {liker.map((element, key) => {
                                    return (
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
                                                {userData.friend_request_sent
                                                    && !userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && !userData.friends.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="text-xs" text="Ajouter en ami" onClick={() => sendRequest(element)}></OutlinedButton>
                                                    )}
                                                {userData.friend_request_sent
                                                    && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="text-xs" text="Annuler ma demande" onClick={() => cancelRequest(element)}></OutlinedButton>
                                                    )}
                                                {!userData.friend_request_sent
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="text-xs" text="Ajouter en ami" onClick={() => { dispatch(sendFriendRequest(element._id, uid)) }}></OutlinedButton>
                                                    )}
                                                {userData.friends
                                                    && userData.friends.some((object) => object.friend === element._id)
                                                    && (
                                                        <OutlinedButton className="text-xs" text="Vous êtes ami"></OutlinedButton>
                                                    )}
                                            </div>
                                        </div>
                                    )
                                })}
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