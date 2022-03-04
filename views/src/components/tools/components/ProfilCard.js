import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../home/functions'
import { avatar, coverPicture } from '../functions/useAvatar'

const ProfilCard = ({ isUser, open, setOpen }) => {
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active project-modal-cover' : 'modal-cover'
    const [user, setUser] = useState()

    useEffect(() => { getUser(isUser, setUser) }, [isUser])

    return (
        <>
            <div className="modal-card" style={{position: "fixed"}}>
                <div className="close-modal" onClick={modalClose}><ImCross /></div>
                {user && (
                    <>
                        <div className="card-top" style={coverPicture(user.cover_picture)}></div>
                        <div className="card-profile">
                            <div className="profile-image" style={avatar(user.picture)}>
                            </div>
                        </div>
                        <div className="card-info">
                            <div className="info-title">
                                <h2>{user.pseudo}</h2>
                                {user.work && <h3>{user.work}</h3>}
                                {user.location && <h3>{user.location}</h3>}
                            </div>
                            <div className="user-info">
                                <div className="info-bloc">
                                    <div>{user.created_projects.length}</div>
                                    <p>Projets<br />créés</p>
                                </div>
                                <div className="info-bloc">
                                    <div>{user.current_projects.length}</div>
                                    <p>Projets<br />en cours</p>
                                </div>
                                <div className="info-bloc">
                                    <div>{user.completed_projects.length}</div>
                                    <p>Projets<br />terminés</p>
                                </div>
                            </div>
                            {user.bio && <div className="info-bio">{user.bio}</div>}
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-primary"><NavLink to={"/projects/" + user.pseudo}>Voir les projets</NavLink></button>
                            <button className="btn btn-primary"><NavLink to={"/" + user.pseudo}>Voir le profil</NavLink></button>
                        </div>
                    </>
                )}
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default ProfilCard