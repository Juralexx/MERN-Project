import React from 'react'
import { useDropzone } from 'react-dropzone';
import { deleteItemFromArray, fullImage } from '../Utils';
import Icon from '../tools/icons/Icon';

const Pictures = ({ datas, setDatas }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png, image/gif, image/tiff, image/bmp',
        maxSize: 5000000,
        onDrop: file => setDatas(data => ({ ...data, mainPic: file }))
    })

    const getFiles = (filesArray) => {
        return datas.files.concat(Array.from(filesArray))
    }

    return (
        <div className="add-project-card">
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Image principale du projet</h3>
                    <p>
                        Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée.
                        Elle sera visible sur votre page de projet, sur le site et les applications mobiles Kickstarter et sur les réseaux sociaux.<br />
                        Votre image doit faire au moins 1024x576 pixels. Elle sera recadrée au format 16:9.<br />
                        À proscrire : les bannières, les badges et le texte. Ces éléments seraient illisibles à petit format et pourraient être pénalisés par l'algorithme Facebook,
                        tout en diminuant vos chances de figurer sur la page d'accueil et dans les lettres d'information de Kickstarter.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    {datas.mainPic.length === 0 ? (
                        <div {...getRootProps({ className: `img-dropzone ${isDragActive && "active"}` })}>
                            <input {...getInputProps()} name="files" />
                            <Icon name="UploadCloud" />
                            <p>
                                Déposez une image ici ou sélectionnez un fichier.<br />
                                <span>Format acceptés : JPG, PNG, GIF, TIFF ou BMP, inférieurs à 5 Mo.</span>
                            </p>
                        </div>
                    ) : (
                        <div className="img-displayer" >
                            <div className="main-img" style={fullImage(URL.createObjectURL(datas.mainPic[0]))}></div>
                            <div className="main-img-btns">
                                <button {...getRootProps()}>
                                    <input {...getInputProps()} name="files" />
                                    <Icon name="Upload" />
                                </button>
                                <button onClick={() => setDatas(data => ({ ...data, mainPic: [] }))}>
                                    <Icon name="Trash" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <h3 className='mt-7'>Ajouter plus d'images</h3>
            <p>
                Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée.
                Elle sera visible sur votre page de projet, sur le site et les applications mobiles Kickstarter et sur les réseaux sociaux.<br />
                Votre image doit faire au moins 1024x576 pixels. Elle sera recadrée au format 16:9.
            </p>
            <div className="add-img-container">
                <div className="img-preview-container">
                    <input
                        className="img-input"
                        type="file"
                        name="files"
                        multiple
                        disabled={datas.pictures.length >= 3}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => setDatas(data => ({ ...data, pictures: getFiles(e.target.files) }))}
                    />
                    <div className="img-preview active">
                        <Icon name="UploadCloud" />
                    </div>
                </div>
                {[...Array(3)].map((_, key) => {
                    return (
                        <div className="img-preview-container" key={key}>
                            {datas.files.length > key ? (
                                <div className="img-preview" style={fullImage(URL.createObjectURL(datas.files[key]))}>
                                    <div className="delete-btn" onClick={() => setDatas(data => ({ ...data, pictures: deleteItemFromArray(datas.files, key) }))}>
                                        <Icon name="Cross" />
                                    </div>
                                </div>
                            ) : (
                                <div className="img-preview">
                                    <Icon name="Picture" />
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