import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfilPicture, uploadProfilPicture } from "../../actions/user.action";
import Swal from 'sweetalert2'

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = async (e) => {
    e.preventDefault()
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      showCancelButton: 'true',
      cancelButtonText: 'Annuler',
      cancelButtonColor: 'red',
      confirmButtonText: 'Enregistrer',
      confirmButtonColor: 'green',
      showCloseButton: 'true',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        Swal.fire({
          title: 'Your uploaded picture',
          showCancelButton: 'true',
          cancelButtonText: 'Annuler',
          cancelButtonColor: 'red',
          confirmButtonText: 'Enregistrer',
          confirmButtonColor: 'green',
          showCloseButton: 'true',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture'
        })
      }
      reader.readAsDataURL(file);
    }

    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    dispatch(uploadProfilPicture(data, userData._id));
  };

  const deletePicture = (e) => {
    e.preventDefault()
    new FormData().append("userId", userData._id);
    dispatch(deleteProfilPicture(userData._id))
  }

  return (
    <form action="" encType="multipart/form-data" className="upload-picture">
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button className="btn btn-primary" onClick={handlePicture} type="submit" value={{ file }}>Modifier</button>
      <button className="btn btn-primary mt-1" onClick={deletePicture} type="submit" >Supprimer</button>
    </form>
  );
};

export default UploadImg;