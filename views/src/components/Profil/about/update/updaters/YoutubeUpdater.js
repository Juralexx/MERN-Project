import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { BsYoutube } from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import { updateYoutube} from "../../../../../actions/user.action";
import { deleteYoutube } from "../../../../../actions/user.action.delete";

const YoutubeUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [youtubeUpdater, setYoutubeUpdater] = useState()
    const [value, setValue] = React.useState("")
    const dispatch = useDispatch()
    const [youtube, setYoutube] = useState(userData.youtube)
    const url = "www.youtube.com/"

    const handleYoutube = (e) => {
        dispatch(updateYoutube(userData._id, youtube))
        setYoutubeUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    };

    const handleYoutubeDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre youtube ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteYoutube(userData._id, youtube))

                Swal.fire({
                    icon: 'success',
                    title: 'Votre youtube a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1700
                })
            }
        })
    }

    const openYoutubeUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="youtube">Youtube</label>
                <input type="youtube" name="youtube" id="youtube" onInput={handleChange} onChange={(e) => setYoutube(e.target.value)} defaultValue={userData.youtube} />
                <div className="youtube error"></div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setYoutubeUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!value} onClick={handleYoutube}>Enregistrer</button>
                </div>
            </div>
        )
    }

    const handleChange = (e) => { setValue(e.target.value) }

    return (
        <>
            {(userData.youtube === "" || userData.youtube === null || userData.youtube === undefined) ? (
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setYoutubeUpdater(true)} style={{ display: youtubeUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter ma chaine Youtube
                        </button>
                        {youtubeUpdater ? openYoutubeUpdater() : null}
                    </div>
            ) : (
                    <div className="user-info">
                        <p style={{ display: youtubeUpdater ? "none" : "flex" }}><BsYoutube /><NavLink to={{ pathname: `//${url}${userData.youtube}/` }} target="_blank"><span>{userData.youtube}</span></NavLink></p>
                        <div className="btn-container">
                            <button className="btn btn-primary btn-edit" onClick={() => setYoutubeUpdater(true)} style={{ display: youtubeUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            <button className="btn btn-primary btn-edit" onClick={handleYoutubeDelete} style={{ display: youtubeUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                        </div>
                        {youtubeUpdater ? openYoutubeUpdater() : null}
                    </div>
            )}
        </>
    )
};

export default YoutubeUpdater;