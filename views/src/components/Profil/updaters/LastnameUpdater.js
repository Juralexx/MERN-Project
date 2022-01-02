import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateName, updateLastname, deleteName, deleteLastname } from "../../../actions/user.action";
import Swal from "sweetalert2";

const LastnameUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [lastname, setLastname] = useState(userData.lastname);
    const [lastnameUpdater, setLastnameUpdater] = useState(false);
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch()

    const handleLastname = (e) => {
        dispatch(updateLastname(userData._id, lastname))
        setLastnameUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    }

    const handleLastnameDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir votre nom ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteLastname(userData._id, lastname))
                setLastnameUpdater()

                Swal.fire({
                    icon: 'success',
                    title: 'Votre nom a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleLastnameChange = (e) => { setValue(e.target.value) }

    const openLastnameUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" id="lastname" placeholder="Votre nom" onChange={handleLastnameChange} onInput={(e) => setLastname(e.target.value)} defaultValue={userData.lastname} />
                <div className="lastname error"></div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setLastnameUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!value} onClick={handleLastname}>Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {(userData.lastname === '') ? (
                <>
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setLastnameUpdater(true)} style={{ display: lastnameUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter mon nom
                        </button>
                        {lastnameUpdater ? openLastnameUpdater() : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        {(userData.lastname === '') ? (
                            <p style={{ display: lastnameUpdater ? "none" : "block" }}><em>Vous n'avez pas encore ajouté votre nom</em></p>
                        ) : (
                            <p style={{ display: lastnameUpdater ? "none" : "block" }}><i className="fas"></i>{userData.lastname}</p>
                        )}
                        <div className="btn-container">
                            <button className="btn btn-primary btn-edit" onClick={() => setLastnameUpdater(true)} style={{ display: lastnameUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            <button className="btn btn-primary btn-edit" onClick={handleLastnameDelete} style={{ display: lastnameUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                        </div>
                        {lastnameUpdater ? openLastnameUpdater() : null}
                    </div>
                </>
            )}
        </>
    )
};

export default LastnameUpdater;