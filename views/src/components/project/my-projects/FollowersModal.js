import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { followProject, unfollowProject } from "../../../actions/project.action";
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { UidContext } from "../../AppContext";
import { avatar } from "../../tools/functions/useAvatar";
import HoverModal from "./HoverModal";
import { ImCross } from 'react-icons/im'
import { BsPlusSquare, BsCheck2Circle } from "react-icons/bs";

const FollowersModal = ({ project }) => {
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const [follower, setFollower] = useState([])

    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [followed, setFollowed] = useState(false)
    const [action, setAction] = useState("")

    useEffect(() => {
        if (project.followers.includes(uid)) { setFollowed(true) }
        else { setFollowed(false) }
    }, [project.followers, uid])

    useEffect(() => {
        if (project.followers.includes(uid)) {
            if (followed) {
                if (project.followers.length > 1)
                    setAction(<span>Vous et {project.followers.length - 1} personnes</span>)
                if (project.followers.length === 1)
                    setAction(<span>Vous</span>)
                if (project.followers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!followed) { setAction(<span>{project.followers.length - 1}</span>) }
        }
        else {
            if (followed) {
                if (project.followers.length > 1)
                    setAction(<span>Vous et {project.followers.length} personnes</span>)
                if (project.followers.length === 1)
                    setAction(<span>Vous et 1 personne</span>)
                if (project.followers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!followed) { setAction(<span>{project.followers.length}</span>) }
        }
    }, [followed, project.followers, uid])

    const follow = () => { dispatch(followProject(project._id, uid)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, uid)); setFollowed(false) }

    useEffect(() => {
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
    }, [project.followers])

    const [hoveredCard, setHoveredCard] = useState(-1);
    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

    return (
        <>
            {uid === null && (
                <Popup trigger={<button className="action-btn"><BsPlusSquare /> <span>{action}</span></button>}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour suivre un projet !</div>
                </Popup>
            )}
            {uid && followed === false && (
                <div className="likers-modal-btn">
                    <div onClick={follow}><BsPlusSquare /></div>
                    <div onClick={modalOpen}><span>{action}</span></div>
                </div>
            )}
            {uid && followed === true && (
                <div className="likers-modal-btn">
                    <div onClick={unfollow}><BsCheck2Circle /></div>
                    <div onClick={modalOpen}><span>{action}</span></div>
                </div>
            )}

            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={modalClose}><ImCross /></div>
                    <div className='header'>
                        <div><BsPlusSquare /> <span>{project.followers.length}</span></div>
                    </div>
                    <div className='body'>
                        <div>
                            {open && (
                                project.followers.length > 0 ? (
                                    <>
                                        {follower.map((element, key) => {
                                            return (
                                                <div className="likers-followers-found" key={key}>
                                                    <div className="user-info-modal-container" onMouseEnter={() => showCardHandler(key)} onMouseLeave={hideCardHandler}>
                                                        <HoverModal
                                                            user={element}
                                                            style={{ display: hoveredCard === key ? 'block' : 'none' }}
                                                        />
                                                    </div>
                                                    <NavLink
                                                        className="modal-list-item"
                                                        to={"/" + element.pseudo}
                                                        onMouseLeave={hideCardHandler}
                                                        onMouseEnter={() => showCardHandler(key)}
                                                        onClick={() => showCardHandler(key)}
                                                    >
                                                        <div className="avatar" style={avatar(element.picture)}></div>
                                                        <p>{element.pseudo}</p>
                                                    </NavLink>

                                                    {userData.friend_request_sent
                                                        && !userData.friend_request_sent.some((object) => object.friend === element._id)
                                                        && !userData.friends.some((object) => object.friend === element._id)
                                                        && element._id !== uid
                                                        && (
                                                            <button className="btn btn-secondary" onClick={() => {
                                                                dispatch(sendFriendRequest(element._id, uid))
                                                            }}>Ajouter en ami</button>
                                                        )}
                                                    {userData.friend_request_sent
                                                        && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                        && element._id !== uid
                                                        && (
                                                            <button className="btn btn-secondary" onClick={() => {
                                                                dispatch(cancelSentFriendRequest(element._id, uid))
                                                            }}>Annuler ma demande</button>
                                                        )}
                                                    {!userData.friend_request_sent
                                                        && element._id !== uid
                                                        && (
                                                            <button className="btn btn-secondary" onClick={() => {
                                                                dispatch(sendFriendRequest(element._id, uid))
                                                            }}>Ajouter en ami</button>
                                                        )}
                                                    {userData.friends
                                                        && userData.friends.some((object) => object.friend === element._id)
                                                        && (
                                                            <button className="btn btn-secondary">Vous êtes ami</button>
                                                        )}
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (<p>Personne n'a encore soutenu ce projet</p>)
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default FollowersModal;