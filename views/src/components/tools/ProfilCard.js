import React from 'react'
import { ImCross } from 'react-icons/im'
import { NavLink } from 'react-router-dom'
import { avatar, coverPicture } from './functions/useAvatar'

const ProfilCard = ({ user, open, setOpen }) => {
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active project-modal-cover' : 'modal-cover'

    return (
        <>
            <div class="modal-card">
                <div className="close-modal" onClick={modalClose}><ImCross /></div>
                <div class="card-top" style={coverPicture(user.cover_picture)}></div>
                <div class="card-profile">
                    <div class="profile-image" style={avatar(user.picture)}>
                    </div>
                </div>
                <div class="card-info">
                    <div class="info-title">
                        <h2>{user.pseudo}</h2>
                        {user.work && <h3>{user.work}</h3>}
                        {user.location && <h3>{user.location}</h3>}
                    </div>
                    <div class="user-info">
                        <div class="info-bloc">
                            <div>{user.created_projects.length}</div>
                            <p>Projets<br />créés</p>
                        </div>
                        <div class="info-bloc">
                            <div>{user.current_projects.length}</div>
                            <p>Projets<br />en cours</p>
                        </div>
                        <div class="info-bloc">
                            <div>{user.completed_projects.length}</div>
                            <p>Projets<br />terminés</p>
                        </div>
                    </div>
                    {user.bio && <div class="info-bio">{user.bio}</div>}
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary"><NavLink to={"/projects/" + user.pseudo}>Voir les projets</NavLink></button>
                    <button className="btn btn-primary"><NavLink to={"/" + user.pseudo}>Voir le profil</NavLink></button>
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default ProfilCard