import axios from 'axios'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdClear, MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from 'react-icons/md'
import { StartIconButton } from '../../../tools/components/Button'
import { coverPicture } from '../../../tools/functions/useAvatar'

const Galery = ({ project }) => {
    const [files, setFiles] = useState([])

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const sendPictures = async (e) => {
        e.preventDefault()
        if (files.length > 0) {
            let formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append(`files`, files[i])
            }
            await axios
                .put(`${process.env.REACT_APP_API_URL}api/project/add-pictures/${project._id}`, formData)
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="add-project-card max-w-[1000px]">
            <form method="put" encType="multipart/form-data">
                <h2>De belles images vous donne plus de visibilité !</h2>
                <div className="add-img-container">
                    <div className="img-preview-container">
                        <input
                            className="img-input"
                            type="file"
                            name="files"
                            multiple
                            accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                            onChange={e => setFiles([...files, e.target.files[0]])}
                        />
                        <div className="img-preview active"><MdOutlineAddPhotoAlternate /></div>
                    </div>
                    {[...Array(4)].map((element, key) => {
                        return (
                            <div className="img-preview-container" key={key}>
                                {files.length > key ? (
                                    <div className="img-preview" style={coverPicture(URL.createObjectURL(files[key]))}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}><MdClear /></div>
                                    </div>
                                ) : (
                                    <div className="img-preview"><MdOutlineInsertPhoto /></div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className="btn-container">
                    <StartIconButton text="Valider" className="next-btn" icon={<FaCheck />} value={{ files }} onClick={(e) => sendPictures(e)} />
                </div>
            </form>
        </div>
    )
}

export default Galery