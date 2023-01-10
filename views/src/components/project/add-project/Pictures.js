import React from 'react'
import { useDropzone } from 'react-dropzone';
import { IoMdCloudDownload } from 'react-icons/io';
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear, MdOutlineFileUpload } from 'react-icons/md'
import { IoTrash } from 'react-icons/io5';
import { fullImage } from '../../Utils';

const Pictures = ({ mainPic, setMainPic, files, setFiles }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png, image/gif, image/tiff, image/bmp',
        maxSize: 5000000,
        onDrop: file => setMainPic(file)
    })

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
            <div className="flex-card">
                <div className="card-left">
                    {mainPic.length === 0 ? (
                        <div {...getRootProps({ className: `img-dropzone ${isDragActive && "active"}` })}>
                            <input {...getInputProps()} name="files" />
                            <IoMdCloudDownload />
                            <p>Déposez une image ici ou sélectionnez un fichier.<br />
                                <span>Format acceptés : JPG, PNG, GIF, TIFF ou BMP, inférieurs à 5 Mo.</span>
                            </p>
                        </div>
                    ) : (
                        <div className="img-displayer" >
                            <div className="main-img" style={fullImage(URL.createObjectURL(mainPic[0]))}></div>
                            <div className="main-img-btns">
                                <button {...getRootProps()}><input {...getInputProps()} name="files" /><MdOutlineFileUpload /></button>
                                <button onClick={() => setMainPic([])}><IoTrash /></button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="card-right">
                    <h3>Image principale du projet</h3>
                    <p>Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée.
                        Elle sera visible sur votre page de projet, sur le site et les applications mobiles Kickstarter et sur les réseaux sociaux.<br />
                        Votre image doit faire au moins 1024x576 pixels. Elle sera recadrée au format 16:9.<br />
                        À proscrire : les bannières, les badges et le texte. Ces éléments seraient illisibles à petit format et pourraient être pénalisés par l'algorithme Facebook,
                        tout en diminuant vos chances de figurer sur la page d'accueil et dans les lettres d'information de Kickstarter.</p>
                </div>
            </div>
            <div className="flex-card !mt-7">
                <div className="card-left">
                    <h3>Ajouter plus d'images</h3>
                    <p>Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée.
                        Elle sera visible sur votre page de projet, sur le site et les applications mobiles Kickstarter et sur les réseaux sociaux.<br />
                        Votre image doit faire au moins 1024x576 pixels. Elle sera recadrée au format 16:9.</p>
                </div>
            </div>
            <div className="add-img-container">
                <div className="img-preview-container">
                    <input
                        className="img-input"
                        type="file"
                        name="files"
                        multiple
                        disabled={files.length >= 3}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => setFiles(getFiles(e.target.files))}
                    />
                    <div className="img-preview active">
                        <div className="svg_container">
                            <MdOutlineAddPhotoAlternate />
                        </div>
                    </div>
                </div>
                {[...Array(3)].map((_, key) => {
                    return (
                        <div className="img-preview-container" key={key}>
                            {files.length > key ? (
                                <div className="img-preview" style={fullImage(URL.createObjectURL(files[key]))}>
                                    <div className="delete-btn" onClick={() => removePicture(key)}><MdClear /></div>
                                </div>
                            ) : (
                                <div className="img-preview">
                                    <div className="svg_container">
                                        <MdOutlineInsertPhoto />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Pictures