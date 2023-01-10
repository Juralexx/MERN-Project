import axios from 'axios'
import React from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProjectPictures } from '../../../../actions/project.action'
import { fullImage } from '../../../Utils'

const Pictures = ({ files, setFiles, pictures, setPictures, projectId }) => {
    const dispatch = useDispatch()

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const getFiles = (filesArray) => {
        return files.concat(Array.from(filesArray))
    }

    const deletePicture = async (picture) => {
        try {
            await axios
                .put(`${process.env.REACT_APP_API_URL}api/project/delete-pictures/${projectId}`, picture)
                .then(() => {
                    dispatch(deleteProjectPictures)
                })
                .catch(err => console.log(err))
        } catch (err) {
            return console.log(err)
        }
    }

    return (
        <div className="add-project-card">
            <h2>De belles images vous donne plus de visibilité !</h2>
            <div className="add-img-container">
                <div className="img-preview-container">
                    <input
                        className="img-input"
                        type="file"
                        name="files"
                        multiple
                        disabled={files.length >= 4}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => setFiles(getFiles(e.target.files))}
                    />
                    <div className="img-preview active"><MdOutlineAddPhotoAlternate /></div>
                </div>
                {[...Array(4)].map((element, key) => {
                    return (
                        <div className="img-preview-container" key={key}>
                            {files.length > key ? (
                                typeof files[key] !== 'object' && files[key] !== null ? (
                                    <div className="img-preview" style={fullImage(files[key])}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}><MdClear /></div>
                                    </div>
                                ) : (
                                    <div className="img-preview" style={fullImage(URL.createObjectURL(files[key]))}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}><MdClear /></div>
                                    </div>
                                )
                            ) : (
                                <div className="img-preview"><MdOutlineInsertPhoto /></div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Pictures