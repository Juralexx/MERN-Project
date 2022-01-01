import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteWork, updateWork } from "../../../actions/user.action";
import Swal from "sweetalert2";

const WorkUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [workUpdater, setWorkUpdater] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [work, setWork] = useState(userData.work);

    const hideWorkUpdater = () => {
        setWorkUpdater()
    }

    const handleWork = (e) => {
        if ((userData.work) !== setWork(e.target.value)) {
            dispatch(updateWork(userData._id, work))
            setSubmitted(true)

            if (submitted) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Vos modifications ont été enregistrées !',
                    showConfirmButton: false,
                    timer: 1700
                })
                hideWorkUpdater()
            }
        }
        if (setWork(e.target.value) === '' || setWork(e.target.value) === undefined) {
            setSubmitted(false)
            hideWorkUpdater()
        }
    }

    const handleWorkDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer ce métier ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteWork(userData._id, work))
                setWorkUpdater()

                Swal.fire({
                    icon: 'success',
                    title: 'Votre métier a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const openWorkUpdater = () => {
        setWorkUpdater(
            <form className="user-info-edit">
                <label htmlFor="work">Métier</label>
                <input type="text" name="work" id="work" onInput={(e) => setWork(e.target.value)} defaultValue={userData.work} />
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={hideWorkUpdater}>Annuler</button>
                    <button className="btn btn-primary" id="checkwork" type="submit" onClick={handleWork}>Enregistrer</button>
                </div>
            </form>
        )
    }

    return (
        <>
            {(userData.work === '' || userData.work === undefined) ? (
                <div className="user-info">
                    <button className="add-btn" onClick={openWorkUpdater} style={{ display: workUpdater ? "none" : "block" }}>
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                        </svg>Ajouter un métier
                    </button>
                    {workUpdater}
                </div>
            ) : (
                <div className="user-info">
                    <p style={{ display: workUpdater ? "none" : "block" }}><i className="fas fa-building"></i>{userData.work}</p>
                    <div className="btn-container">
                        <button className="btn btn-primary btn-edit" id="checkout" onClick={openWorkUpdater} style={{ display: workUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                        <button className="btn btn-primary btn-edit" id="checkout" onClick={handleWorkDelete} style={{ display: workUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                    </div>
                    {workUpdater}
                </div>
            )}
        </>
    )
};

export default WorkUpdater;