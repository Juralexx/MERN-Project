import React from 'react'
import { ImCross } from 'react-icons/im'

const UserModal = ({ setOpen, open, avatar, friend }) => {
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const modalClose = () => { setOpen(false) }

    return (
        <>
            <div className={containerClass + " user-conversation-modal"}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={() => { modalClose() }}><ImCross /></div>
                    <div className='header'>
                        <div className="user-modal-img" style={avatar(friend.picture)}></div>
                        <div className="user-modal-pseudo">{friend.pseudo}</div>
                    </div>
                    <div className='body'>
                        <ul>
                            {friend.name && <li>Prénom : {friend.name}</li>}
                            {friend.lastname && <li>Nom : {friend.lastname}</li>}
                            {friend.work && <li>Métier : {friend.work}</li>}
                            {friend.email && <li>Email : {friend.email}</li>}
                            {friend.phone && <li>Téléphone : {friend.phone}</li>}
                            <li>Projets créés : {friend.created_projects.length}</li>
                            <li>Projets en cours : {friend.current_projects.length}</li>
                            <li>Projets terminés : {friend.completed_projects.length}</li>
                        </ul>
                    </div>
                    <div className='footer'>
                    </div>
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default UserModal