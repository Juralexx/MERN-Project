import React from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { coverPicture } from '../../tools/functions/useAvatar'

const Pictures = ({ pictures, setPictures }) => {

    const removePicture = (index) => {
        const array = pictures.slice()
        array.splice(index, 1)
        setPictures(array)
    }

    console.log(pictures)

    return (
        <div className="add-img-bloc add-project-bloc">
            <h3>De belles images vous donne plus de visibilité !</h3>
            <div className="add-img-row">
                <div className="input-img-container input">
                    <input
                        type="file"
                        name="pictures"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => setPictures([...pictures, e.target.files[0]])}
                    />
                    <input
                        type="hidden"
                        // name="pictures"
                        value={pictures}
                        multiple
                    />
                    <div className="content"><MdOutlineAddPhotoAlternate className="img-bg" /></div>
                </div>
                <div className="input-img-container">
                    {pictures.length ? (
                        <div className="content" style={coverPicture(URL.createObjectURL(pictures[0]))}>
                            <div className="remove-img" onClick={() => removePicture(0)}><MdClear /></div>
                        </div>
                    ) : (
                        <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                    )}
                </div>
                <div className="input-img-container">
                    {pictures.length > 1 ? (
                        <div className="content" style={coverPicture(URL.createObjectURL(pictures[1]))}>
                            <div className="remove-img" onClick={() => removePicture(1)}><MdClear /></div>
                        </div>
                    ) : (
                        <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                    )}
                </div>
                <div className="input-img-container">
                    {pictures.length > 2 ? (
                        <div className="content" style={coverPicture(URL.createObjectURL(pictures[2]))}>
                            <div className="remove-img" onClick={() => removePicture(2)}><MdClear /></div>
                        </div>
                    ) : (
                        <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                    )}
                </div>
                <div className="input-img-container">
                    {pictures.length > 3 ? (
                        <div className="content" style={coverPicture(URL.createObjectURL(pictures[3]))}>
                            <div className="remove-img" onClick={() => removePicture(3)}><MdClear /></div>
                        </div>
                    ) : (
                        <div className="content"><MdOutlineInsertPhoto className="img-bg" /></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pictures