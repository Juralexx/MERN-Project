import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { Button } from '../../../tools/global/Button'
import { ErrorCard } from '../../../tools/global/Error'
import { ClassicInput } from '../../../tools/global/Inputs'
import EditorToolbar, { formats, modules } from '../../../tools/editor/EditorToolbar'
import { coverPicture } from '../../../tools/hooks/useAvatar'
import { FaCheck } from 'react-icons/fa'
import { MdClear, MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from 'react-icons/md'
import { randomNbLtID, removeAccents } from '../../../Utils'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { createActuality } from '../../../../actions/project.action'

const AddActuality = ({ project, user }) => {
    const [title, setTitle] = useState("")
    const [isErr, setErr] = useState(false)
    const [error, setError] = useState(null)
    const checkErr = (name) => { if (isErr === name) return "err" }
    const [description, setDescription] = useState("")
    const [count, setCount] = useState(0)
    const quillRef = useRef()
    const [files, setFiles] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (text, delta, source, editor) => {
        setDescription(editor.getContents())
        setCount(editor.getText().length - 1)

        quillRef.current.getEditor().on('text-change', () => {
            if (editor.getLength() > 10000) {
                quillRef.current.getEditor().deleteText(4000, editor.getLength());
            }
        })
    }

    const removePicture = (index) => {
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
            let cleanTitle = title.toLowerCase();
            cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
            cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤"`*?!;<>[\]{}/\\\\]/g, " ")
            cleanTitle = cleanTitle.replace(/ +/g, " ")
            cleanTitle = cleanTitle.trim()
            setTitle(cleanTitle)

            let URL = cleanTitle.toLowerCase();
            URL = URL.replace(/[&#,+()$~%^.|_@°=§µ£¤"'`*?!;<>[\]{}/\\\\]/g, " ")
            URL = removeAccents(URL)
            URL = URL.replace(/ /g, "-")
            let URLID = Math.floor(Math.random() * (9999999 - 1000000 + 1)).toString()

            const actuality = {
                _id: randomNbLtID(24),
                posterId: user._id,
                posterPseudo: user.pseudo,
                posterPicture: user.picture,
                title: cleanTitle,
                url: URL,
                urlid: URLID,
                description: description,
                date: new Date().toISOString()
            }

            const activity = { type: "add-actuality", who: user.pseudo, actuality: actuality.title, date: new Date().toISOString() }
            dispatch(createActuality(project._id, actuality, activity))
                .then(async () => {
                    if (files.length > 0) {
                        let formData = new FormData()
                        for (let i = 0; i < files.length; i++) {
                            formData.append('files', files[i])
                        }
                        await axios
                            .put(`${process.env.REACT_APP_API_URL}api/project/add-actuality-pictures/${project._id}/${actuality._id}`, formData)
                            .catch(err => console.log(err))

                    }
                }).then(() => {
                    setTimeout(() => navigate(`/projects/${project.URLID}/${project.URL}/actuality/${actuality.urlid}/${actuality.url}`), 2000)
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className="content_container add-actuality">
            <div className="content_box">
                <div className="header flex justify-between mb-5">
                    <h2>Ajouter une actualité</h2>
                </div>
                <div className="content-form">
                    <p className="title full">Titre <span>Champ requis</span></p>
                    <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre de l'actualité" onChange={(e) => setTitle((e.target.value).substring(0, 100))} value={title} />
                    <div className="field_infos full">{title.length} / 100 caractères</div>
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
                        <div className="field_infos ml-auto">{count} / 4000 caractères</div>
                    </div>
                </div>

                <div className="add-img-container py-3">
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
                                    <div className="img-preview" style={coverPicture(URL.createObjectURL(files[key]))}>
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
                <div className="btn_container">
                    <Button><Link to={`/projects/${project.URLID}/${project.URL}/actuality`}>Annuler</Link></Button>
                    <Button className="next-btn ml-2" onClick={handleActuality}><FaCheck />Valider et publier</Button>
                </div>
            </div>
        </div>
    )
}

export default AddActuality