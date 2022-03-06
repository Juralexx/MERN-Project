import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { UidContext } from "../../AppContext";
import HoverModal from "./HoverModal";
import Modal from "./Modal";
import { MdOutlineBookmark } from 'react-icons/md'
import { OutlinedButton } from "./Button";
import { avatar } from "../functions/useAvatar";

const FollowersModal = ({ project, open, setOpen }) => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [follower, setFollower] = useState([])

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

    const [hoveredCard, setHoveredCard] = useState(-1);
    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

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
                                        <div className="min-w-[300px]"
                                            onMouseLeave={hideCardHandler}
                                            onMouseEnter={() => showCardHandler(key)}
                                            onClick={() => showCardHandler(key)}
                                        >
                                            <HoverModal user={element} style={{ display: hoveredCard === key ? 'block' : 'none' }} />
                                            <div className="py-2 flex justify-between w-full">
                                                <NavLink to={"/" + element.pseudo} style={{ display: "flex" }}>
                                                    <div className="w-9 h-9 rounded-full" style={avatar(element.picture)}></div>
                                                    <p className="flex items-center ml-2">{element.pseudo}</p>
                                                </NavLink>
                                                {userData.friend_request_sent
                                                    && !userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && !userData.friends.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Ajouter en ami" onClick={() => { dispatch(sendFriendRequest(element._id, uid)) }}></OutlinedButton>
                                                    )}
                                                {userData.friend_request_sent
                                                    && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Annuler ma demande" onClick={() => { dispatch(cancelSentFriendRequest(element._id, uid)) }}></OutlinedButton>
                                                    )}
                                                {!userData.friend_request_sent
                                                    && element._id !== uid
                                                    && (
                                                        <OutlinedButton className="btn btn-secondary" text="Ajouter en ami" onClick={() => { dispatch(sendFriendRequest(element._id, uid)) }}></OutlinedButton>
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