import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '../../tools/icons/Icon'
import ReactQuill from 'react-quill'
import EditorToolbar, { formats, modules } from '../../tools/editor/EditorToolbar'
import { Button, TextButton } from '../../tools/global/Button'
import { ErrorCard } from '../../tools/global/ErrorCard'
import { ClassicInput } from '../../tools/global/Inputs'
import { addClass, fullImage, removeAccents } from '../../Utils'

const EditActuality = ({ project, user, websocket }) => {
    const { urlid, url } = useParams()
    const navigate = useNavigate()

    const actuality = project.actualities.find(actu => actu.url === url && actu.urlid === urlid)

    const [datas, setDatas] = useState({
        title: actuality.title,
        uri: actuality.url,
        description: actuality.description.ops,
        files: actuality.pictures,
        newFiles: [],
        deletedFiles: []
    })

    const quillRef = useRef()
    const [count, setCount] = useState(0)
    const [error, setError] = useState({ element: "", error: "" })

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
            const arr = datas.newFiles.slice()
            arr.splice(index, 1)
            setDatas(prevState => ({ ...prevState, newFiles: arr }))
        }

        if (typeof datas.files[index] !== 'object') {
            setDatas(prevState => ({
                ...prevState,
                deletedFiles: [...datas.deletedFiles, datas.files[index].substring(datas.files[index].indexOf(`${actuality._id}`) + actuality._id.length + 1)]
            }))
        }
    }

    const getFiles = (filesArray) => {
        setDatas(data => ({
            ...data,
            files: datas.files.concat(Array.from(filesArray)),
            newFiles: datas.newFiles.concat(Array.from(filesArray))
        }))
    }

    const handleActuality = async () => {
        if (datas.title.length < 10 || datas.title.length > 100) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 100 caractères"
            })
        } else if (datas.description.length < 10 || datas.description.length > 4000) {
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

            const activity = {
                type: "update-actuality",
                who: user.pseudo,
                actuality: datas.title,
                date: new Date().toISOString()
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${actuality._id}/update/`,
                data: {
                    actuality: {
                        ...actuality,
                        title: datas.title,
                        url: datas.uri,
                        description: datas.description
                    },
                    activity: activity
                }
            })
                .then(async () => {
                    if (datas.deletedFiles.length > 0) {
                        await axios({
                            method: "put",
                            url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${actuality._id}/pictures/delete/`,
                            data: {
                                deletedFiles: datas.deletedFiles
                            }
                        })
                            .then(async () => {
                                if (datas.newFiles.length > 0) {
                                    let formData = new FormData()
                                    for (let i = 0; i < datas.newFiles.length; i++) {
                                        formData.append('files', datas.newFiles[i])
                                    }
                                    await axios
                                        .put(`${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${actuality._id}/pictures/update/`, formData)
                                        .catch(err => console.log(err))
                                }
                            })
                    } else {
                        if (datas.newFiles.length > 0) {
                            let formData = new FormData()
                            for (let i = 0; i < datas.newFiles.length; i++) {
                                formData.append('files', datas.newFiles[i])
                            }
                            await axios
                                .put(`${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${actuality._id}/pictures/update/`, formData)
                                .catch(err => console.log(err))
                        }
                    }
                })
                .then(() => {
                    project.members.map(member => {
                        return websocket.current.emit("updateActuality", {
                            receiverId: member._id,
                            actuality: {
                                ...actuality,
                                title: datas.title,
                                url: datas.uri,
                                description: datas.description
                            },
                            activity: activity
                        })
                    })
                })
                .then(() => {
                    setTimeout(() => {
                        navigate(`/projects/${project.URLID}/${project.URL}/actuality/${actuality.url}`)
                    }, 2000)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container-lg py-8 pb-[100px]">
            <h3 className="mb-5">
                Modifier l'actualité : {datas.title}
            </h3>
            <p className="title full">Titre <span>Champ requis</span></p>
            <ClassicInput
                className={`full ${addClass(error.element === "title", "err")}`}
                type="text"
                placeholder="Titre de l'actualité"
                value={datas.title}
                onChange={e => setDatas(data => ({ ...data, title: (e.target.value).substring(0, 100) }))}
            />
            <div className="field_infos full">{datas.title.length} / 100 caractères</div>
            <ErrorCard
                display={error.element === "title"}
                text={error.error}
                clean={() => setError({ element: "", error: "" })}
            />

            <p className="title min-w-[100%]">Description de votre actualité <span>Champ requis</span></p>
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
                        <Link to={`/projects/${project.URLID}/${project.URL}/actuality`}>
                            Annuler
                        </Link>
                    </TextButton>
                    <Button className="ml-2" onClick={handleActuality}>
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditActuality