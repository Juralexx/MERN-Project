import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import EditorToolbar, { formats, modules } from '../../../tools/editor/EditorToolbar'
import { StartIconButton } from '../../../tools/components/Button'
import { ErrorCard } from '../../../tools/components/Error'
import { ClassicInput } from '../../../tools/components/Inputs'
import { coverPicture } from '../../../tools/functions/useAvatar'
import { removeAccents } from '../../../Utils'
import { MdClear, MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

const EditActuality = ({ project }) => {
    const { url } = useParams()
    const actuality = project.actualities.find(actu => actu.url === url)
    const [title, setTitle] = useState(actuality.title)
    const [URL, setURL] = useState(actuality.url)
    const [description, setDescription] = useState(actuality.description.ops)
    const [count, setCount] = useState(0)
    const quillRef = useRef()
    const [files, setFiles] = useState(actuality.pictures)
    const [deletedFiles, setDeletedFiles] = useState([])
    const [isErr, setErr] = useState(false)
    const [error, setError] = useState(null)
    const checkErr = (name) => { if (isErr === name) return "err" }

    const handleChange = (text, delta, source, editor) => {
        setDescription(editor.getContents())
        setCount(editor.getText().length - 1)

        if (quillRef.current) {
            quillRef.current.getEditor().on('text-change', () => {
                if (editor.getLength() > 10000) {
                    quillRef.current.getEditor().deleteText(4000, editor.getLength());
                }
            })
        }
    }

    const removePicture = (element, index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const getFiles = (filesArray) => {
        return files.concat(Array.from(filesArray))
    }

    const handleActuality = async () => {
        if (title === "" || title.length < 10 || title.length > 100) {
            setErr("title")
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 100 caractères")
        } else if (description === "" || description.length < 10 || description.length > 4000) {
            setErr("description")
            setError("Veuillez ajouter une description à votre actualité")
        } else {
            if (title !== actuality.title) {
                let cleanTitle = title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤"`*?!;<>[\]{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setTitle(cleanTitle)

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setURL(URL)
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/add-actuality/${project._id}`,
                data: {
                    actualityId: actuality._id,
                    title: title,
                    url: URL,
                    description: description
                }
            }).then(async () => {
                let isNewFile = files.filter(file => typeof file === 'object').length > 0
                if (isNewFile) {
                    let deletedFiles = actuality.pictures.filter(picture => !files.includes(picture))
                    let deletedNames = []
                    deletedFiles.forEach(file => {
                        deletedNames.push(file.substring(file.indexOf(`${actuality._id}/`) + 1))
                    })
                    let formData = new FormData()
                    for (let i = 0; i < files.length; i++) {
                        formData.append('files', files[i])
                    }
                    await axios
                        .put(`${process.env.REACT_APP_API_URL}api/project/add-actuality-pictures/${project._id}/${actuality._id}`, formData)
                        .catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className="project-add-actuality">
            <div className="project-add-actuality-container">
                <div className="header flex justify-between mb-5">
                    <h2>Modifier l'actualité : {title}</h2>
                </div>
                <div className="content-form">
                    <p className="title full">Titre <span>Champ requis</span></p>
                    <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre de l'actualité" onChange={(e) => setTitle((e.target.value).substring(0, 100))} value={title} />
                    <div className="field-infos full">{title.length} / 100 caractères</div>
                    {isErr === "title" && <ErrorCard display={isErr === "title"} text={error} clean={() => setErr("")} />}
                </div>

                <div className="content-form">
                    <p className="title min-w-[100%]">Description de votre actualité <span>Champ requis</span></p>
                    <div className="text-editor">
                        <EditorToolbar />
                        <ReactQuill
                            ref={quillRef}
                            style={{ height: 300 }}
                            value={description}
                            onChange={handleChange}
                            modules={modules}
                            formats={formats}
                        />
                        <div className="field-infos ml-auto">{count} / 4000 caractères</div>
                    </div>
                </div>

                <div className="add-img-container py-3">
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
                                        <div className="img-preview" style={coverPicture(files[key])}>
                                            <div className="delete-btn" onClick={() => { removePicture(key); setDeletedFiles(file => [...file, files[key]]) }}><MdClear /></div>
                                        </div>
                                    ) : (
                                        <div className="img-preview" style={coverPicture(URL.createObjectURL(files[key]))}>
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
                <div className="btn-container">
                    <StartIconButton text="Valider" className="next-btn" icon={<FaCheck />} onClick={handleActuality} />
                </div>
            </div>
        </div>
    )
}

export default EditActuality