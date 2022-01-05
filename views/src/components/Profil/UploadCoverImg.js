import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoverPicture, uploadCoverPicture } from "../../actions/user.action";
import Swal from "sweetalert2";

const UploadCoverImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handleSave = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("userId", userData._id)
        data.append("file", file)
        dispatch(uploadCoverPicture(data, userData._id));

        Swal.fire({
            icon: 'success',
            title: 'Votre image a bien été ajoutée !',
            showConfirmButton: false,
            timer: 1500
        })
        setFile(false)
    }

    const deletePicture = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre photo de profil ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCoverPicture(userData._id, userData.picture))

                Swal.fire({
                    icon: 'success',
                    title: 'Votre photo a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className="btn-cover-edit">
            {(userData.coverPicture === "/img/random-cover.jpg") ? (
                <div className="fileUpload btn btn-primary">
                    <span>Ajouter une photo de couverture</span>
                    <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onInput={(e) => setFile(e.target.files[0])} onChange={handleSave} />
                </div>
            ) : (
                <>
                    <div className="fileUpload btn btn-primary">
                        <span>Modifier ma photo</span>
                        <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onInput={(e) => setFile(e.target.files[0])} onChange={handleSave} />
                    </div>
                    <button className="btn btn-primary" onClick={deletePicture}>Supprimer ma photo</button>
                </>
                )
            }
        </div>

    )
}

export default UploadCoverImg;