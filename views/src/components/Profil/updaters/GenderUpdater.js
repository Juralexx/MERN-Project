import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteGender, updateGender } from "../../../actions/user.action";
import Swal from "sweetalert2";
import { FaTransgender } from 'react-icons/fa'
import { GiMale, GiFemale } from 'react-icons/gi'

const GenderUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [gender, setGender] = useState("");
    const [genderUpdater, setGenderUpdater] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch()

    const handleGender = () => {
        dispatch(updateGender(userData._id, gender))
        setGenderUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleGenderDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer cette information ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteGender(userData._id, gender))

                Swal.fire({
                    icon: 'success',
                    title: 'Votre métier a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const openGenderUpdater = () => {
        return (
            <div className="user-info-edit">
                <label htmlFor="gender">Genre</label>
                <div className="gender-updater">
                    <div>
                        <input className="option-input" type="radio" name="gender" onClick={(e) => setGender("Homme")} /> <label>Homme</label>
                    </div>
                    <div>
                        <input className="option-input" type="radio" name="gender" onClick={(e) => setGender("Femme")} /> <label>Femme</label>
                    </div>
                    <div>
                        <input className="option-input" type="radio" name="gender" onClick={(e) => setGender("Non défini")} /> <label>Non-défini</label>
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={() => setGenderUpdater(false)}>Annuler</button>
                    <button className="btn btn-primary" onClick={handleGender}>Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {(userData.gender === 'Non défini') ? (
                <div className="user-info">
                    <p style={{ display: genderUpdater ? "none" : "flex" }}><FaTransgender /><span>{userData.gender}</span></p>
                    <div className="btn-container">
                        <button className="btn btn-primary btn-edit" onClick={() => setGenderUpdater(true)} style={{ display: genderUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                    </div>
                    {genderUpdater ? openGenderUpdater() : null}
                </div>
            ) : (
                <div className="user-info">
                    {userData.gender === "Non défini" && (<p style={{ display: genderUpdater ? "none" : "flex" }}><FaTransgender /><span>{userData.gender}</span></p>)}
                    {userData.gender === "Homme" && (<p style={{ display: genderUpdater ? "none" : "flex" }}><GiMale /><span>{userData.gender}</span></p>)}
                    {userData.gender === "Femme" && (<p style={{ display: genderUpdater ? "none" : "flex" }}><GiFemale /><span>{userData.gender}</span></p>)}

                    <div className="btn-container">
                        <button className="btn btn-primary btn-edit" onClick={() => setGenderUpdater(true)} style={{ display: genderUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                        <button className="btn btn-primary btn-edit" onClick={handleGenderDelete} style={{ display: genderUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                    </div>
                    {genderUpdater ? openGenderUpdater() : null}
                </div>
            )}
        </>
    )
};

export default GenderUpdater;