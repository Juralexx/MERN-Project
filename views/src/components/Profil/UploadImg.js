import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfilPicture, uploadProfilPicture } from "../../actions/user.action";
import AvatarEditor from 'react-avatar-editor'
import Swal from "sweetalert2";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const [open, setOpen] = useState(false)
  const modalOpen = () => { setOpen(true) }
  const modalClose = () => { setOpen(false) }
  const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
  const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
  const profilAvatar = {
    backgroundImage: "url(" + userData.picture + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  var editor = ""
  const [picture, setPicture] = useState({
    width: 200,
    height: 200,
    border: 20,
    color: [0, 0, 0, 0.3],
    borderRadius: 200,
    rotate: 1,
    zoom: 1.8,
    croppedImg: file
  });

  const handleZoom = (event, value) => {
    setPicture({
      ...picture,
      zoom: event.target.value,
    });
  };
  const handleRotate = (event, value) => {
    setPicture({
      ...picture,
      rotate: event.target.value,
    });
  };

  const setEditorRef = (ed) => { editor = ed };

  const handleSave = (e) => {
    e.preventDefault();
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();

      setPicture({
        ...picture,
        croppedImg: canvasScaled
      });

      const data = new FormData()
      data.append("userId", userData._id)
      data.append("file", file)
      dispatch(uploadProfilPicture(data, userData._id))

      modalClose()

      Swal.fire({
        icon: 'success',
        title: 'Votre image a bien été ajoutée !',
        showConfirmButton: false,
        timer: 1500
      })

      setFile(false)
      e.stopPropagation();
    }
  };

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
        dispatch(deleteProfilPicture(userData._id, userData.picture))
        modalClose()

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
    <div>
      <button className="btn-img-edit" onClick={modalOpen}><i className="fas fa-pen"></i></button>

      <div className={containerClass}>
        <div className="modal-inner">
          <div className="close-modal" onClick={modalClose}><i className="fas fa-times"></i></div>
          <div className='header'></div>
          <div className='body'>
            {!file ? (
              <div className="avatar" style={profilAvatar}></div>
            ) : (
              <>
                <AvatarEditor
                  ref={setEditorRef}
                  image={file}
                  width={picture.width}
                  height={picture.height}
                  border={picture.border}
                  color={picture.color}
                  borderRadius={picture.borderRadius}
                  rotate={picture.rotate}
                  scale={picture.zoom}
                />
                <input
                  defaultValue={picture.zoom}
                  name="scale"
                  type="range"
                  onChange={handleZoom}
                  min="1"
                  max="3"
                  step="0.01"
                />
                <input
                  defaultValue={picture.rotate}
                  name="rotate"
                  type="range"
                  onChange={handleRotate}
                  max="360"
                  step="0.01"
                />
              </>
            )}
          </div>
          <div className='footer'>
            {!file ? (
              <form action="" encType="multipart/form-data" className="upload-picture">
                <div className="modal-container-btn">
                  { (userData.picture === './img/random-user.png') ? (
                    <div className="fileUpload btn btn-primary">
                      <span>Ajouter une photo</span>
                      <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                  ) : (
                    <>
                      <div className="fileUpload btn btn-primary">
                        <span>Modifier ma photo</span>
                        <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
                      </div>
                      <button className="btn btn-primary" onClick={deletePicture} >Supprimer ma photo</button>
                    </>
                  )}
                </div>
              </form>
            ) : (
              <form action="" encType="multipart/form-data" className="upload-picture">
                <div className="modal-container-btn">
                  <div className="fileUpload btn btn-primary">
                    <span>Changer de photo</span>
                    <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  <button className="btn btn-primary" onClick={handleSave} type="button" value={{ file }}>Valider</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className={coverClass} onClick={modalClose}></div>
    </div>

  )
}

export default UploadImg;