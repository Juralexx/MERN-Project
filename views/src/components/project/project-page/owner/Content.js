import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { useDispatch } from "react-redux";
import { updateContent } from "../../../../actions/project.action";

const Content = ({ props, id }) => {
    const [content, setContent] = useState("")
    const [updateContentForm, setUpdateContentForm] = useState(false)
    const [value, setValue] = React.useState(false);
    const dispatch = useDispatch()

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
        setValue(true)
    }

    const hideContentUpdater = () => { setUpdateContentForm(false) }

    const handleContent = () => {
        dispatch(updateContent(id, content))
        setUpdateContentForm(false)
    }

    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(props, callback)
    var html = converter.convert(props)
    function getDescription() { return ({ __html: html }) }

    return (
        <div>
            {!updateContentForm ? (
                <>
                    <p dangerouslySetInnerHTML={getDescription()}></p>
                    <div className="btn-container">
                        {/* <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button> */}
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
                            defaultValue={props}
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