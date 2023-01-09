import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import EditorToolbar, { formats, modules } from '../../../tools/editor/EditorToolbar'
import { Button, TextButton } from '../../../tools/global/Button'
import { ErrorCard } from '../../../tools/global/Error'
import { ClassicInput } from '../../../tools/global/Inputs'
import { coverPicture } from '../../../tools/hooks/useAvatar'
import { removeAccents } from '../../../Utils'
import { updateActuality } from '../../../../actions/project.action'
import { MdClear, MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from 'react-icons/md'

const EditActuality = ({ project }) => {
    const { urlid, url } = useParams()
    const actuality = project.actualities.find(actu => actu.url === url && actu.urlid === urlid)
    const [title, setTitle] = useState(actuality.title)
    const [uri, setUri] = useState(actuality.url)
    const [description, setDescription] = useState(actuality.description.ops)
    const [count, setCount] = useState(0)
    const quillRef = useRef()
    const [files, setFiles] = useState(actuality.pictures)
    const [deletedFiles, setDeletedFiles] = useState([])
    const [pictures, setPictures] = useState([])
    const [error, setError] = useState({ element: "", error: "" })
    const checkErr = name => { if (error.element === name) return "err" }
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)

        if (typeof files[index] === 'object') {
            const arr = pictures.slice()
            arr.splice(index, 1)
            setPictures(arr)
        }

        if (typeof files[index] !== 'object') {
            setDeletedFiles(arr => [...arr, files[index].substring(files[index].indexOf(`${actuality._id}`) + actuality._id.length + 1)])
        }
    }

    const getFiles = (filesArray) => {
        setFiles(files.concat(Array.from(filesArray)))
        setPictures(pictures.concat(Array.from(filesArray)))
    }

    const handleActuality = async () => {
        if (title === "" || title.length < 10 || title.length > 100) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 100 caractères"
            })
        } else if (description === "" || description.length < 10 || description.length > 4000) {
            setError({
                element: "description",
                error: "Veuillez ajouter une description à votre actualité"
            })
        } else {
            if (title !== actuality.title) {
                let cleanTitle = title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤"`*?!;<>[\]{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setTitle(cleanTitle)

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setUri(URL)
            }

            dispatch(updateActuality(project._id, actuality._id, title, uri, description))
                .then(async () => {
                    if (deletedFiles.length > 0) {
                        await axios({
                            method: "put",
                            url: `${process.env.REACT_APP_API_URL}api/project/delete-actuality-pictures/${project._id}/${actuality._id}`,
                            data: {
                                deletedFiles: deletedFiles
                            }
                        }).then(async () => {
                            if (pictures.length > 0) {
                                let formData = new FormData()
                                for (let i = 0; i < pictures.length; i++) {
                                    formData.append('files', pictures[i])
                                }
                                await axios
                                    .put(`${process.env.REACT_APP_API_URL}api/project/update-actuality-pictures/${project._id}/${actuality._id}`, formData)
                                    .catch(err => console.log(err))
                            }
                        })
                    } else {
                        if (pictures.length > 0) {
                            let formData = new FormData()
                            for (let i = 0; i < pictures.length; i++) {
                                formData.append('files', pictures[i])
                            }
                            await axios
                                .put(`${process.env.REACT_APP_API_URL}api/project/update-actuality-pictures/${project._id}/${actuality._id}`, formData)
                                .catch(err => console.log(err))
                        }
                    }
                }).then(() => {
                    setTimeout(() => navigate(`/projects/${project.URLID}/${project.URL}/actuality/${actuality.url}`), 2000)
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className="container-lg py-8 pb-[100px]">
            <div className="header flex justify-between mb-5">
                <h3>Modifier l'actualité : {title}</h3>
            </div>
            <div className="content-form">
                <p className="title full">Titre <span>Champ requis</span></p>
                <ClassicInput
                    className={`full ${checkErr("title")}`}
                    type="text"
                    placeholder="Titre de l'actualité"
                    onChange={(e) => setTitle((e.target.value).substring(0, 100))} value={title}
                />
                <div className="field_infos full">{title.length} / 100 caractères</div>
                {error.element === "title" &&
                    <ErrorCard display={error.element === "title"} text={error.error} clean={() => setError({ element: "", error: "" })} />
                }
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
                    <div className="field_infos ml-auto">{count} / 4000 caractères</div>
                </div>
            </div>

            <div className="add-img-container py-6">
                <div className="img-preview-container">
                    <input
                        className="img-input"
                        type="file"
                        name="files"
                        multiple
                        disabled={files.length >= 3}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => getFiles(e.target.files)}
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
                                typeof files[key] !== 'object' && files[key] !== null ? (
                                    <div className="img-preview" style={coverPicture(files[key])}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}>
                                            <MdClear />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="img-preview" style={coverPicture(URL.createObjectURL(files[key]))}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}>
                                            <MdClear />
                                        </div>
                                    </div>
                                )
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
            <div id="back-actions">
                <div className='back-actions-inner'>
                    <TextButton>
                        <Link to={`/projects/${project.URLID}/${project.URL}/actuality`}>Annuler</Link>
                    </TextButton>
                    <Button className="ml-2" onClick={handleActuality}>Enregistrer</Button>
                </div>
            </div>
        </div>
    )
}

export default EditActuality