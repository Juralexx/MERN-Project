import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfilPicture, uploadProfilPicture } from "../../actions/user.action";
import Swal from 'sweetalert2'
import Cropper from "cropperjs";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", userData.pseudo)
    data.append("userId", userData._id)
    data.append("file", file)
    dispatch(uploadProfilPicture(data, userData._id))
  };

  const deletePicture = (e) => {
    e.preventDefault()
    dispatch(deleteProfilPicture(userData._id, userData.picture))
  }

  return (
    <form action="" encType="multipart/form-data" className="upload-picture">
      <div className="modal-container-btn">
        <div className="fileUpload btn btn-primary">
          <span>Modifier ma photo</span>
          <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button className="btn btn-primary" onClick={handlePicture} value={{ file }}>Valider</button>
        {(userData.picture === './img/random-user.png') ? <></> : <button className="btn btn-primary" onClick={deletePicture} >Supprimer ma photo</button>}
      </div>
    </form>
  );
};

export default UploadImg;