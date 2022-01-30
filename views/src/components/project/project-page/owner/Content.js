import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "../../../../actions/project.action";

const Content = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [content, setContent] = useState("")
    const [updateContentForm, setUpdateContentForm] = useState(false)
    const [value, setValue] = useState(false)
    const dispatch = useDispatch()
    const [modified, setModified] = useState(false)

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
        setValue(true)
    }

    const hideContentUpdater = () => { setUpdateContentForm(false) }

    const handleContent = () => {
        dispatch(updateContent(id, content))
        setUpdateContentForm(false)
        setModified(true)
    }

    function getDescription() {
        var callback = {}
        var converter = new QuillDeltaToHtmlConverter(props, callback)
        var html = converter.convert(props)
        return ({ __html: html })
    }

    return (
        <div>
            {!updateContentForm ? (
                <>
                    {modified ? (
                        <p dangerouslySetInnerHTML={{ __html: projectData.content }}></p>
                    ) : (
                        <p dangerouslySetInnerHTML={getDescription()}></p>
                    )}
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={() => setUpdateContentForm(!updateContentForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-editor">
                        <EditorToolbar />
                        <ReactQuill
                            name="content"
                            id="content"
                            style={{ height: 200 }}
                            theme="snow"
                            defaultValue={modified ? (projectData.content) : (props)}
                            onChange={handleChange}
                            placeholder={"Décrivez votre projet..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideContentUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleContent}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Content;