import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ImCross } from 'react-icons/im'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { NavLink } from "react-router-dom";
import HoverModal from "./HoverModal";
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likeProject, unlikeProject } from '../../../actions/project.action';

const LikersModal = ({ project }) => {
    const [open, setOpen] = useState(false)
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'

    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [liker, setLiker] = useState([])
    const avatar = { backgroundImage: "url(" + liker.picture + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }

    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [project.likers, uid])

    const like = () => { dispatch(likeProject(project._id, uid)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, uid)); setLiked(false) }

    useEffect(() => {
        if (open) {
            if (project.likers.length > 0) {
                const findLikers = async () => {
                    try {
                        const likerFound = project.likers.map(async (likerId) => {
                            return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${likerId}`)
                                .then((res) => res.data)
                                .catch((err) => console.error(err))
                        })
                        Promise.all(likerFound).then((res) => {
                            setLiker(res)
                            console.log(res)
                        })
                    }
                    catch (err) { console.log(err) }
                }
                findLikers()
            }
        }
    }, [project.likers, open])

    return (
        <>
            <div>
                <div className="likers-modal-btn" onClick={modalOpen}><IoIosHeart />
                    {liked ? ( <span>Vous et {project.likers.length} autres personnes</span> ) : ( <span>{project.likers.length}</span> )}
                </div>

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
                                        liker.map((element, key) => {
                                            return (
                                                <div className="likers-followers-found" key={key}>
                                                    <NavLink to={"/" + element.pseudo} onMouseEnter={() => setOpenInfoModal(true)} onMouseLeave={() => setOpenInfoModal(false)}>
                                                        <div className="avatar" style={avatar}></div>
                                                        <p>{element.pseudo}</p>
                                                    </NavLink>
                                                    <HoverModal user={element} />
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p>Personne n'a encore soutenu ce projet</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={coverClass} onClick={modalClose}></div>
            </div>
            <div>
                {uid === null && (
                    <Popup trigger={<button className="action-btn"><IoIosHeartEmpty /> <span>J'aime</span></button>}
                        position={['bottom center', 'bottom right', 'bottom left']}
                        closeOnDocumentClick>
                        <div>Connectez-vous pour aimer un projet !</div>
                    </Popup>
                )}
                {uid && liked === false && (
                    <button className="action-btn" onClick={like}><IoIosHeartEmpty /> <span>J'aime</span></button>
                )}
                {uid && liked === true && (
                    <button className="action-btn liked" onClick={unlike}><IoIosHeart /> <span>Je n'aime plus</span></button>
                )}
            </div>
        </>
    )
}

export default LikersModal;