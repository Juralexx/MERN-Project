import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarEditor from 'react-avatar-editor'
import { deleteProfilPicture, uploadProfilPicture } from "../../../actions/user.action.upload";
import { avatar } from "../../tools/functions/useAvatar";
import Modal from '../../tools/components/Modal'
import { IconToggle } from "../../tools/components/Button";
import { MdPhotoCamera } from 'react-icons/md'

const UploadImg = ({ user }) => {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState()
    const error = useSelector(state => state.errorsReducer.uploadProfilPictureErrors)
    const dispatch = useDispatch()

    let editor = ""
    const [picture, setPicture] = useState({
        width: 200,
        height: 200,
        border: 30,
        color: [0, 0, 0, 0.4],
        borderRadius: 200,
        rotate: 1,
        zoom: 1,
        croppedImg: file
    })

    const handleZoom = (e, value) => {
        setPicture({ ...picture, zoom: e.target.value })
    }
    const handleRotate = (e, value) => {
        setPicture({ ...picture, rotate: e.target.value })
    }

    const setEditorRef = ed => { editor = ed };

    const handleSave = () => {
        if (setEditorRef) {
            setPicture({ ...picture, croppedImg: editor.getImageScaledToCanvas() })

            const data = new FormData()
            data.append("userId", user._id)
            data.append("file", file)
            dispatch(uploadProfilPicture(data, user._id))

            if (error) { return error }
            else {
                setOpen(false)
                setFile(false)
            }
        }
    };

    const deletePicture = () => {
        dispatch(deleteProfilPicture(user._id, user.picture))
        setOpen(false)
    }

    return (
        <>
            <IconToggle className="btn_img_edit" icon={<MdPhotoCamera />} onClick={() => setOpen(!open)} />
            <Modal open={open} setOpen={setOpen} className="profil_img_modal">
                <div className="profil_img_modal_body">
                    {!file ? (
                        <>
                            <div className="modal_avatar" style={avatar(user.picture)}></div>
                            <h3>Photo de profil</h3>
                            <p>Nous acceptons les formats : jpg, jpeg, png<br />Poids max : 2 Mo</p>
                        </>
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

                            {error && <p className="error">{error}</p>}

                            <div className="range_container">
                                <label>Zoom</label>
                                <input
                                    className="range_style"
                                    type="range"
                                    defaultValue={picture.zoom}
                                    name="scale"
                                    onChange={e => handleZoom(e)}
                                    min="1"
                                    max="3"
                                    step="0.01"
                                />
                            </div>
                            <div className="range_container">
                                <label>Rotation</label>
                                <input
                                    className="range_style"
                                    type="range"
                                    defaultValue={picture.rotate}
                                    name="rotate"
                                    onChange={e => handleRotate(e)}
                                    max="360"
                                    step="0.01"
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className='footer'>
                    {!file ? (
                        user.picture === `${process.env.REACT_APP_API_URL}files/img/random-user.jpg` ? (
                            <div className="btn btn_first file_upload">
                                <span>Ajouter une photo</span>
                                <input type="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={e => setFile(e.target.files[0])} />
                            </div>
                        ) : (
                            <div className="modal_container_btn">
                                <div className="btn btn_first file_upload">
                                    <span>Modifier ma photo</span>
                                    <input type="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={e => setFile(e.target.files[0])} />
                                </div>
                                <button className="btn btn_first" onClick={deletePicture}>Supprimer ma photo</button>
                            </div>
                        )
                    ) : (
                        <div className="modal_container_btn">
                            <div className="btn btn_first file_upload">
                                <span>Changer de photo</span>
                                <input type="file" id="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <button className="btn btn_first" onClick={handleSave} value={{ file }}>Valider</button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default UploadImg;