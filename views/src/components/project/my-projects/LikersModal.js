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

    const [isModalOpen, setModalIsOpen] = useState(false)
    const [liker, setLiker] = useState([])
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", width: 50, height: 50 }) }

    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [action, setAction] = useState("")
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [])

    useEffect(() => {
        if (project.likers.includes(uid)) {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length - 1} autres personnes</span>)
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
                    setAction(<span>Vous et {project.likers.length} autres personnes</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous et 1 autre personne</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length}</span>) }
        }
    }, [liked])

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
    }, [])

    const handleOnHover = async (userID) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${userID}`);
            setUsers(data)
            setModalIsOpen(true)
        } catch (err) { console.error(err) }
    }

    const closeUserModal = () => { setModalIsOpen(false) }
    const keepUserModal = () => { setModalIsOpen(true) }
    const modal = () => {
        return <HoverModal user={users} onMouseEnter={keepUserModal} onMouseLeave={closeUserModal} />

    }

    return (
        <>
            <div>
                <div className="likers-modal-btn" onClick={modalOpen}><IoIosHeart />{action}</div>

                <div className={containerClass}>
                    <div className="modal-inner">
                        <div className="close-modal" onClick={modalClose}><ImCross /></div>
                        <div className='header'>
                            <div><IoIosHeartEmpty /> <span>{project.likers.length}</span></div>
                        </div>
                        <div className='body'>
                            <div>
                                {open && (
                                    project.likers.length > 0 ? (<>
                                        {liker.map((element, key) => {
                                            return (
                                                <div className="likers-followers-found" key={key}>
                                                    <NavLink to={"/" + element.pseudo} onMouseEnter={() => handleOnHover(element._id)} onMouseLeave={closeUserModal}>
                                                        <div className="avatar" style={avatar(element.picture)}></div>
                                                        <p>{element.pseudo}</p>
                                                    </NavLink>
                                                </div>
                                            )
                                        })}
                                        
                                        {isModalOpen && modal()}
                                        </>
                                    ) : (<p>Personne n'a encore soutenu ce projet</p>)
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