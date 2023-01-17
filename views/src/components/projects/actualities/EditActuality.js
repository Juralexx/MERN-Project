import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill'
import EditorToolbar, { formats, modules } from '../../tools/editor/EditorToolbar'
import { Button, TextButton } from '../../tools/global/Button'
import { ErrorCard } from '../../tools/global/Error'
import { ClassicInput } from '../../tools/global/Inputs'
import { fullImage, removeAccents } from '../../Utils'
import { updateActuality } from '../../../reducers/project.action'
import Icon from '../../tools/icons/Icon'

const EditActuality = ({ project }) => {
    const { urlid, url } = useParams()
    const actuality = project.actualities.find(actu => actu.url === url && actu.urlid === urlid)
    const [datas, setDatas] = useState({
        title: actuality.title,
        uri: actuality.url,
        description: actuality.description.ops,
        files: actuality.pictures
    })
    const [count, setCount] = useState(0)
    const quillRef = useRef()
    const [deletedFiles, setDeletedFiles] = useState([])
    const [pictures, setPictures] = useState([])
    const [error, setError] = useState({ element: "", error: "" })
    const checkErr = name => { if (error.element === name) return "err" }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (text, delta, source, editor) => {
        setDatas(data => ({ ...data, description: editor.getContents() }))
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
        const array = datas.files.slice()
        array.splice(index, 1)
        setDatas(data => ({ ...data, files: array }))

        if (typeof datas.files[index] === 'object') {
            const arr = pictures.slice()
            arr.splice(index, 1)
            setPictures(arr)
        }

        if (typeof datas.files[index] !== 'object') {
            setDeletedFiles(arr => [...arr, datas.files[index].substring(datas.files[index].indexOf(`${actuality._id}`) + actuality._id.length + 1)])
        }
    }

    const getFiles = (filesArray) => {
        setDatas(data => ({ ...data, files: datas.files.concat(Array.from(filesArray)) }))
        setPictures(pictures.concat(Array.from(filesArray)))
    }

    const handleActuality = async () => {
        if (datas.title === "" || datas.title.length < 10 || datas.title.length > 100) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 100 caractères"
            })
        } else if (datas.description === "" || datas.description.length < 10 || datas.description.length > 4000) {
            setError({
                element: "description",
                error: "Veuillez ajouter une description à votre actualité"
            })
        } else {
            if (datas.title !== actuality.title) {
                let cleanTitle = datas.title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤"`*?!;<>[\]{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setDatas(data => ({ ...data, title: cleanTitle }))

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setDatas(data => ({ ...data, uri: URL }))
            }

            dispatch(updateActuality(project._id, actuality._id, datas.title, datas.uri, datas.description))
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
                <h3>Modifier l'actualité : {datas.title}</h3>
            </div>
            <div className="content-form">
                <p className="title full">Titre <span>Champ requis</span></p>
                <ClassicInput
                    className={`full ${checkErr("title")}`}
                    type="text"
                    placeholder="Titre de l'actualité"
                    onChange={e => setDatas(data => ({ ...data, title: (e.target.value).substring(0, 100) }))}
                    value={datas.title}
                />
                <div className="field_infos full">{datas.title.length} / 100 caractères</div>
                {error.element === "title" &&
                    <ErrorCard
                        display={error.element === "title"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                }
            </div>

            <div className="content-form">
                <p className="title min-w-[100%]">Description de votre actualité <span>Champ requis</span></p>
                <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                        ref={quillRef}
                        style={{ height: 300 }}
                        value={datas.description}
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
                        disabled={datas.files.length >= 3}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => getFiles(e.target.files)}
                    />
                    <div className="img-preview active">
                        <div className="svg_container">
                            <Icon name="UploadCloud" />
                        </div>
                    </div>
                </div>
                {[...Array(3)].map((_, key) => {
                    return (
                        <div className="img-preview-container" key={key}>
                            {datas.files.length > key ? (
                                typeof datas.files[key] !== 'object' && datas.files[key] !== null ? (
                                    <div className="img-preview" style={fullImage(datas.files[key])}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}>
                                            <Icon name="Cross" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="img-preview" style={fullImage(URL.createObjectURL(datas.files[key]))}>
                                        <div className="delete-btn" onClick={() => removePicture(key)}>
                                            <Icon name="Cross" />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="img-preview">
                                    <div className="svg_container">
                                        <Icon name="Picture" />
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