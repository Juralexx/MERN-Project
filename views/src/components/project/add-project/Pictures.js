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
            <h2>De belles images vous donne plus de visibilité !</h2>
            <div className="flex-card mb-5">
                <div>
                    <h3>Images du projet</h3>
                    <p>Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée.
                        Elle sera visible sur votre page de projet, sur le site et les applications mobiles Kickstarter et sur les réseaux sociaux.<br />
                        Votre image doit faire au moins 1024x576 pixels. Elle sera recadrée au format 16:9.<br />
                        À proscrire : les bannières, les badges et le texte. Ces éléments seraient illisibles à petit format et pourraient être pénalisés par l'algorithme Facebook,
                        tout en diminuant vos chances de figurer sur la page d'accueil et dans les lettres d'information de Kickstarter.</p>
                </div>
            </div>
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
        </div>
    )
}

export default Pictures