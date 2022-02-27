import React from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";

const Description = ({ content, setContent, contentError }) => {
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
    }

    return (
        <div className="add-content-bloc add-project-bloc" disabled>
            <h3>Il est temps d'expliquer votre projet en détail !</h3>
            <div className="content-container">
                <label htmlFor="content"><span>Description de votre projet</span><small>Champ requis</small></label>

                <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                        name="content"
                        id="content"
                        style={{ height: 200 }}
                        theme="snow"
                        value={content}
                        onChange={handleChange}
                        placeholder={"Décrivez votre projet..."}
                        modules={modules}
                        formats={formats}
                    />
                </div>
            </div>
            <div className="error" ref={contentError}></div>
        </div>
    )
}

export default Description