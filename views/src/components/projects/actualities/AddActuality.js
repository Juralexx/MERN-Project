import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { Button, TextButton } from '../../tools/global/Button'
import { ErrorCard } from '../../tools/global/ErrorCard'
import { ClassicInput } from '../../tools/global/Inputs'
import EditorToolbar, { formats, modules } from '../../tools/editor/EditorToolbar'
import { addClass, fullImage, randomNbLtID, removeAccents } from '../../Utils'
import Icon from '../../tools/icons/Icon'

const AddActuality = ({ project, user, websocket }) => {
    const [datas, setDatas] = useState({
        title: '',
        description: '',
        files: []
    })
    const [count, setCount] = useState(0)
    const quillRef = useRef()
    const [error, setError] = useState({ element: "", error: "" })
    const navigate = useNavigate()

    const handleChange = (text, delta, source, editor) => {
        setDatas(data => ({ ...data, description: editor.getContents() }))
        setCount(editor.getText().length - 1)

        quillRef.current.getEditor().on('text-change', () => {
            if (editor.getLength() > 10000) {
                quillRef.current.getEditor().deleteText(10000, editor.getLength());
            }
        })
    }

    const removePicture = (index) => {
        const array = datas.files.slice()
        array.splice(index, 1)
        setDatas(data => ({ ...data, files: array }))
    }

    const getFiles = (filesArray) => {
        return datas.files.concat(Array.from(filesArray))
    }

    const handleActuality = async () => {
        if (datas.title === "" || datas.title.length < 10 || datas.title.length > 60) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères."
            })
        } else if (datas.description === "" || datas.description.length < 10 || datas.description.length > 10000) {
            setError({
                element: "description",
                error: "Veuillez ajouter une description à votre actualité, votre titre doit faire entre 10 et 10 000 caractères."
            })
        } else {
            let cleanTitle = datas.title.toLowerCase();
            cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
            cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤"`*?!;<>[\]{}/\\\\]/g, " ")
            cleanTitle = cleanTitle.replace(/ +/g, " ")
            cleanTitle = cleanTitle.trim()
            setDatas(data => ({ ...data, title: cleanTitle }))

            let URL = cleanTitle.toLowerCase();
            URL = URL.replace(/[&#,+()$~%^.|_@°=§µ£¤"'`*?!;<>[\]{}/\\\\]/g, " ")
            URL = removeAccents(URL)
            URL = URL.replace(/ /g, "-")
            let URLID = Math.floor(Math.random() * (9999999 - 1000000 + 1)).toString()

            const actuality = {
                _id: randomNbLtID(24),
                poster: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture,
                },
                title: cleanTitle,
                url: URL,
                urlid: URLID,
                description: datas.description,
                date: new Date().toISOString()
            }
            const activity = {
                type: "add-actuality",
                who: user.pseudo,
                actuality: actuality.title,
                date: new Date().toISOString()
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/add/`,
                data: {
                    actuality: actuality,
                    activity: activity
                }
            })
                .then(async () => {
                    if (datas.files.length > 0) {
                        let formData = new FormData()
                        for (let i = 0; i < datas.files.length; i++) {
                            formData.append('files', datas.files[i])
                        }
                        await axios
                            .put(`${process.env.REACT_APP_API_URL}api/project/${project._id}/actualities/${actuality._id}/pictures/add/`, formData)
                            .catch(err => console.log(err))
                    }
                })
                .then(() => {
                    project.members.map(member => {
                        return websocket.current.emit("createActuality", {
                            receiverId: member._id,
                            actuality: actuality,
                            activity: activity
                        })
                    })
                    setTimeout(() => {
                        navigate(`/projects/${project.URLID}/${project.URL}/actuality/${actuality.urlid}/${actuality.url}`)
                    }, 2000)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container-lg pt-8 pb-[100px] add-actuality">
            <div className="header flex justify-between mb-5">
                <h2>Ajouter une actualité</h2>
            </div>
            <div className="content-form">
                <p className="title full">Titre <span>Champ requis</span></p>
                <ClassicInput
                    className={`full ${addClass(error.element === "title", "err")}`}
                    type="text"
                    placeholder="Titre de l'actualité"
                    onChange={e => setDatas(data => ({ ...data, title: (e.target.value).substring(0, 60) }))}
                    value={datas.title}
                />
                <div className="field_infos full">{datas.title.length} / 60 caractères</div>
                <ErrorCard
                    display={error.element === "title"}
                    text={error.error}
                    clean={() => setError({ element: "", error: "" })}
                />
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
                    <div className="field_infos ml-auto">{count} / 10 000 caractères</div>
                    <ErrorCard
                        display={error.element === "description"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />
                </div>
            </div>

            <div className="add-img-container py-3">
                <div className="img-preview-container">
                    <input
                        className="img-input"
                        type="file"
                        name="files"
                        multiple
                        disabled={datas.files.length >= 3}
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp"
                        onChange={e => setDatas(data => ({ ...data, files: getFiles(e.target.files) }))}
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
                                <div className="img-preview" style={fullImage(URL.createObjectURL(datas.files[key]))}>
                                    <div className="delete-btn" onClick={() => removePicture(key)}>
                                        <Icon name="Cross" />
                                    </div>
                                </div>
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
                    <Button className="ml-2" onClick={handleActuality}>
                        Valider et publier
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddActuality