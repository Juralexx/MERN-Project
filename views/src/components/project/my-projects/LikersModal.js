import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ImCross } from 'react-icons/im'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { NavLink } from "react-router-dom";
import HoverModal from "./HoverModal";
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from '../../AppContext';
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likeProject, unlikeProject } from '../../../actions/project.action';
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";

const LikersModal = ({ project }) => {
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'

    const [liker, setLiker] = useState([])
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", width: 40, height: 40, borderRadius: '30px', marginRight: '10px' }) }

    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [action, setAction] = useState("")

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [project.likers, uid])

    useEffect(() => {
        if (project.likers.includes(uid)) {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length - 1} personnes</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length - 1}</span>) }
        }
        else {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length} personnes</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous et 1 personne</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length}</span>) }
        }
    }, [liked, project.likers, uid])

    const like = () => { dispatch(likeProject(project._id, uid)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, uid)); setLiked(false) }

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

    const [hoveredCard, setHoveredCard] = useState(-1);
    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

    return (
        <>
            {uid === null && (
                <Popup trigger={<button className="action-btn"><IoIosHeartEmpty /> {action}</button>}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un projet !</div>
                </Popup>
            )}
            {uid && liked === false && (
                <div className="likers-modal-btn">
                    <div onClick={like}><IoIosHeartEmpty /></div>
                    <div onClick={modalOpen}>{action}</div>
                </div>
            )}
            {uid && liked === true && (
                <div className="likers-modal-btn">
                    <div onClick={unlike}><IoIosHeart /></div>
                    <div onClick={modalOpen}>{action}</div>
                </div>
            )}

            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={modalClose}><ImCross /></div>
                    <div className='header'>
                        <div><IoIosHeartEmpty /> <span>{project.likers.length}</span></div>
                    </div>
                    <div className='body'>
                        <div>
                            {open && (
                                project.likers.length > 0 ? (
                                    <>
                                        {liker.map((element, key) => {
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

export default LikersModal;