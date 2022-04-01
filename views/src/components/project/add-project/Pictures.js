import React from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { coverPicture } from '../../tools/functions/useAvatar'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { StartIconButton } from '../../tools/components/Button';

const Pictures = ({ files, setFiles, onNext, onBack, handleAddProject }) => {

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const getFiles = (filesArray) => {
        return files.concat(Array.from(filesArray))
    }

    return (
        <div className="add-project-card">
            <form method="post" encType="multipart/form-data">
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
                    <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                    <StartIconButton text="Valider" className="next-btn" icon={<FaCheck />} onClick={handleAddProject} />
                </div>
            </form>
        </div>
    )
}

export default Pictures