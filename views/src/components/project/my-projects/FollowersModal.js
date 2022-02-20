import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCross } from 'react-icons/im'
import { NavLink } from "react-router-dom";
import { avatar } from "../../tools/functions/useAvatar";
import HoverModal from "./HoverModal";

const FollowersModal = ({ project }) => {
    const [open, setOpen] = useState(false)
    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [follower, setFollower] = useState([])

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

    return (
        <div>
            <div className="likers-modal-btn" onClick={modalOpen}><p>Suivi par <span>{project.followers.length}</span> personnes</p></div>

            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={modalClose}><ImCross /></div>
                    <div className='header'>
                        <div><p>Suivi par <span>{project.followers.length}</span> personnes</p></div>
                    </div>
                    <div className='body'>
                        <div>
                            {open && (
                                project.followers.length > 0 ? (
                                    follower.map((element, key) => {
                                        return (
                                            <div className="likers-followers-found" key={key}>
                                                <NavLink to={"/" + element.pseudo} onMouseEnter={() => setOpenInfoModal(true)} onMouseLeave={() => setOpenInfoModal(false)}>
                                                    <div className="avatar" style={avatar(follower.picture)}></div>
                                                    <p>{element.pseudo}</p>
                                                </NavLink>
                                                {openInfoModal && (<HoverModal user={element} />)}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>Personne ne suit ce projet</p>
                                )
                            )}
                        </div>
                    </div>
                    <div className='footer'>
                    </div>
                </div>
            </div>

            <div className={coverClass} onClick={modalClose}></div>
        </div>
    )
}

export default FollowersModal;