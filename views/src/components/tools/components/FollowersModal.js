import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cancelFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { UidContext, UserContext } from "../../AppContext";
import { avatar } from "../functions/useAvatar";
import Modal from "./Modal";
import HoverModal from "./HoverModal";
import { OutlinedButton } from "./Button";
import { MdOutlineBookmark } from 'react-icons/md'

const FollowersModal = ({ project, open, setOpen, websocket }) => {
    const user = useContext(UserContext)
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [follower, setFollower] = useState([])
    const [hoveredCard, setHoveredCard] = useState(-1)
    const dispatch = useDispatch()

    useEffect(() => {
        if (open) {
            const findFollowers = async () => {
                try {
                    const followerFound = project.followers.map(async (followerId) => {
                        return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${followerId}`)
                            .then((res) => res.data)
                            .catch((err) => console.error(err))
                    })
                    Promise.all(followerFound).then((res) => {
                        setFollower(res)
                    })
                }
                catch (err) { console.log(err) }
            }
            findFollowers()
        }
    }, [project.followers, open])

    const sendRequest = (element) => {
        const notification = { type: "friend-request", requesterId: user._id, requester: user.pseudo, requesterPicture: user.picture, date: new Date().toISOString() }
        websocket.current.emit("friendRequestNotification", {
            receiverId: element._id,
            notification: notification
        })
        dispatch(sendFriendRequest(element._id, uid, notification))
    }

    const cancelRequest = (element) => {
        websocket.current.emit("cancelFriendRequestNotification", {
            type: "friend-request",
            requesterId: user._id,
            receiverId: element._id
        })
        dispatch(cancelFriendRequest(element._id, uid, element.type))
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen} css='bg-background_primary text-slate-300'>
                <div className="flex pb-2 border-b border-slate-300/20">
                    <MdOutlineBookmark className="w-6 h-6 text-primary mr-1" />
                    <p>Suivi par {project.followers.length} personnes</p>
                </div>
                <div className="py-2">
                    {open && (
                        project.followers.length > 0 ? (
                            <>
                                {follower.map((element, key) => {
                                    return (
                                        <div className="min-w-[300px]" key={key}>
                                            <div className="py-2 relative flex justify-between w-full cursor-pointer"
                                                onMouseLeave={() => setHoveredCard(-1)}
                                            >
                                                <HoverModal user={element} style={{ display: hoveredCard === key ? 'block' : 'none' }} />
                                                <NavLink to={"/" + element.pseudo}
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
                                                        <OutlinedButton className="btn btn-secondary" text="Ajouter en ami" onClick={() => sendRequest(element)}></OutlinedButton>
                                                    )}
                                                {userData.friend_request_sent
                                                    && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Annuler ma demande" onClick={() => cancelRequest(element)}></OutlinedButton>
                                                    )}
                                                {!userData.friend_request_sent
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Ajouter en ami" onClick={() => sendRequest(element)}></OutlinedButton>
                                                    )}
                                                {userData.friends
                                                    && userData.friends.some((object) => object.friend === element._id)
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Vous êtes ami"></OutlinedButton>
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

export default FollowersModal;