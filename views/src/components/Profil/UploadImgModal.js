import React, { useState } from "react"
import { useSelector } from "react-redux"
import UploadImg from "./UploadImg"


const Modal = () => {
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)

    const modalOpen = () => { setOpen(true) }
    const modalClose = () => { setOpen(false) }

    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'

    const profilAvatar = {
        backgroundImage: "url(" + userData.picture + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div>
            <button className="btn-img-edit" onClick={modalOpen}><i className="fas fa-pen"></i></button>

            <div className={containerClass}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={modalClose}><i className="fas fa-times"></i></div>
                    <div className='header'></div>
                    <div className='body'>
                        <div className="avatar" style={profilAvatar}></div>
                    </div>
                    <div className='footer'>
                        <UploadImg />
                    </div>
                </div>
            </div>

            <div className={coverClass} onClick={modalClose}></div>
        </div>
    )
}

export default Modal