import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateName } from "../../../actions/user.action";
import { deleteName } from "../../../actions/user.action.delete";
import Swal from "sweetalert2";
import { BsFillPersonFill } from 'react-icons/bs'

const NameUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [name, setName] = useState(userData.name);
    const [nameUpdater, setNameUpdater] = useState(false);
    const [nameValue, setNameValue] = React.useState("");
    const dispatch = useDispatch()

    const handleName = (e) => {
        dispatch(updateName(userData._id, name))
        setNameUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
    }

    const handleNameDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre prénom ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteName(userData._id, name))
                setNameUpdater()

                Swal.fire({
                    icon: 'success',
                    title: 'Votre prénom a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleNameChange = (e) => { setNameValue(e.target.value) }

    const openNameUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="name">Prénom</label>
                <input type="text" name="name" id="name" placeholder="Votre prénom" onChange={handleNameChange} onInput={(e) => setName(e.target.value)} defaultValue={userData.name} />
                <div className="name error"></div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setNameUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" disabled={!nameValue} onClick={handleName}>Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {(userData.name === '' || userData.name === null || userData.name === undefined) ? (
                <>
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setNameUpdater(true)} style={{ display: nameUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter mon prénom
                        </button>
                        {nameUpdater ? openNameUpdater() : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        {(userData.name === '') ? (
                            <p style={{ display: nameUpdater ? "none" : "flex" }}><BsFillPersonFill /><span><em>Vous n'avez pas encore ajouté votre prénom</em></span></p>
                        ) : (
                            <p style={{ display: nameUpdater ? "none" : "flex" }}><BsFillPersonFill /><span>{userData.name}</span></p>
                        )}
                        <div className="btn-container">
                            <button className="btn btn-primary btn-edit" onClick={() => setNameUpdater(true)} style={{ display: nameUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            <button className="btn btn-primary btn-edit" onClick={handleNameDelete} style={{ display: nameUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                        </div>
                        {nameUpdater ? openNameUpdater() : null}
                    </div>
                </>
            )}
        </>
    )
};

export default NameUpdater;