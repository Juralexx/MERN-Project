import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { BsInstagram } from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import { updateInstagram } from "../../../../actions/user.action";
import { deleteInstagram } from "../../../../actions/user.action.delete";

const InstagramUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [instagramUpdater, setInstagramUpdater] = useState()
    const [value, setValue] = React.useState("")
    const dispatch = useDispatch()
    const [instagram, setInstagram] = useState(userData.instagram)
    const url = "www.instagram.com/"

    const handleinstagram = (e) => {
        dispatch(updateInstagram(userData._id, instagram))
        setInstagramUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    };

    const handleinstagramDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre instagram ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteInstagram(userData._id, instagram))

                Swal.fire({
                    icon: 'success',
                    title: 'Votre instagram a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1700
                })
            }
        })
    }

    const openInstagramUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="instagram">instagram</label>
                <input type="instagram" name="instagram" id="instagram" onInput={handleChange} onChange={(e) => setInstagram(e.target.value)} defaultValue={userData.instagram} />
                <div className="instagram error"></div>
                <div className="btn_container">
                    <button className="btn btn-primary" onClick={() => setInstagramUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!value} onClick={handleinstagram}>Enregistrer</button>
                </div>
            </div>
        )
    }

    const handleChange = (e) => { setValue(e.target.value) }

    return (
        <>
            {(userData.instagram === "" || userData.instagram === null || userData.instagram === undefined) ? (
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setInstagramUpdater(true)} style={{ display: instagramUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter mon Instagram
                        </button>
                        {instagramUpdater ? openInstagramUpdater() : null}
                    </div>
            ) : (
                    <div className="user-info">
                        <p style={{ display: instagramUpdater ? "none" : "flex" }}><BsInstagram /><NavLink to={{ pathname: `//${url}${userData.instagram}/` }} target="_blank"><span>{userData.instagram}</span></NavLink></p>
                        <div className="btn_container">
                            <button className="btn btn-primary btn-edit" onClick={() => setInstagramUpdater(true)} style={{ display: instagramUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            <button className="btn btn-primary btn-edit" onClick={handleinstagramDelete} style={{ display: instagramUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                        </div>
                        {instagramUpdater ? openInstagramUpdater() : null}
                    </div>
            )}
        </>
    )
};

export default InstagramUpdater;