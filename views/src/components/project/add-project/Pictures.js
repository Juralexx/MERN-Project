import React from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { coverPicture } from '../../tools/functions/useAvatar'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IconButton, Button } from '../../tools/components/Button';

const Pictures = ({ files, setFiles, onNext, onBack, handleAddProject }) => {

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const classes = {
        svg: "h-[100px] w-[100px]"
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
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => setFiles([...files, e.target.files[0]])}
                        />
                        <input
                            type="hidden"
                            name="pictures"
                            value={files}
                            multiple
                        />
                        <div className="img-preview active">
                            <MdOutlineAddPhotoAlternate />
                        </div>
                    </div>
                    {[...Array(4)].map((element, key) => {
                        return (
                            <div className="img-preview-container">
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
                <div className="w-full flex justify-between mt-4 ">
                    <IconButton text="Back" startIcon={<IoMdArrowRoundBack className="w-6 h-6" />} className="w-[90px]" onClick={onBack} />
                    <Button text="Publier mon projet" type="submit" onClick={handleAddProject} value={files} />
                </div>
            </form>
        </div>
    )
}

export default Pictures