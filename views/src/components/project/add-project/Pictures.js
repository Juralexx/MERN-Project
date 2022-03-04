import React, { useRef } from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { coverPicture } from '../../tools/functions/useAvatar'

const Pictures = ({ files, setFiles }) => {

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    return (
        <div className="add-img-bloc add-project-bloc">
            <form method="post" encType="multipart/form-data">
                <h3>De belles images vous donne plus de visibilité !</h3>
                <div className="add-img-row">
                    <div className="input-img-container input">
                        <input
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
                        <div className="content"><MdOutlineAddPhotoAlternate className="img-bg" /></div>
                    </div>
                    <div className="input-img-container">
                        {files.length ? (
                            <div className="content" style={coverPicture(URL.createObjectURL(files[0]))}>
                                <div className="remove-img" onClick={() => removePicture(0)}><MdClear /></div>
                            </div>
                        ) : (
                            <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                        )}
                    </div>
                    <div className="input-img-container">
                        {files.length > 1 ? (
                            <div className="content" style={coverPicture(URL.createObjectURL(files[1]))}>
                                <div className="remove-img" onClick={() => removePicture(1)}><MdClear /></div>
                            </div>
                        ) : (
                            <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                        )}
                    </div>
                    <div className="input-img-container">
                        {files.length > 2 ? (
                            <div className="content" style={coverPicture(URL.createObjectURL(files[2]))}>
                                <div className="remove-img" onClick={() => removePicture(2)}><MdClear /></div>
                            </div>
                        ) : (
                            <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                        )}
                    </div>
                    <div className="input-img-container">
                        {files.length > 3 ? (
                            <div className="content" style={coverPicture(URL.createObjectURL(files[3]))}>
                                <div className="remove-img" onClick={() => removePicture(3)}><MdClear /></div>
                            </div>
                        ) : (
                            <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Pictures