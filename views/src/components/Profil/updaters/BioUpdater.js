import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBio, updateBio } from "../../../actions/user.action";
import Swal from "sweetalert2";

const BioUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const [bio, setBio] = useState(userData.bio)
    const [updateBioForm, setUpdateBioForm] = useState(false)
    const dispatch = useDispatch()

    const hideEmailUpdater = () => {
        setUpdateBioForm(false)
    }

    const handleBio = (e) => {
        dispatch(updateBio(userData._id, bio))
        setUpdateBioForm(false)
    }

    const handleBioDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre description ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBio(userData._id, bio))
                setUpdateBioForm(false)

                Swal.fire({
                    icon: 'success',
                    title: 'Votre description a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className="bio">
            {updateBioForm === false ? (
                <>
                    {(userData.bio === '') ? (
                        <>
                            <p>Vous n'avez pas encore de description</p>
                            <div className="btn-container">
                                <button className="btn btn-primary" onClick={() => setUpdateBioForm(!updateBioForm)}>Ajouter ma description</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>{userData.bio}</p>
                            <div className="btn-container">
                                <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button>
                                <button className="btn btn-primary" onClick={() => setUpdateBioForm(!updateBioForm)}>Modifier</button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideEmailUpdater}>Annuler</button>
                        <button className="btn btn-primary" onClick={handleBio}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>

    )
}

export default BioUpdater;