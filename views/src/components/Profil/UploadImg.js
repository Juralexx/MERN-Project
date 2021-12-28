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
    const data = new FormData()
    data.append("name", userData.pseudo)
    data.append("userId", userData._id)
    data.append("file", file)
    dispatch(uploadProfilPicture(data, userData._id))
    e.preventDefault()
  };

  const deletePicture = (e) => {
    e.preventDefault()
    dispatch(deleteProfilPicture(userData._id, userData.picture))
  }

  return (
    <form action="" encType="multipart/form-data" className="upload-picture">
      <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button className="btn btn-primary" onClick={handlePicture} value={{ file }}><i className="fas fa-pen"></i></button>
      { (userData.picture === './img/random-user.png') ? <></> : <button className="btn btn-primary mt-1" onClick={deletePicture} >Supprimer</button> }
    </form>
  );
};

export default UploadImg;