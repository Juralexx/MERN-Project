import React, { useState, useRef } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../../tools/editor/EditorToolbar";

const Content = ({ content, setContent }) => {
    const [count, setCount] = useState(0)
    const quillRef = useRef()

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents())
        setCount(editor.getText().length - 1)
    }

    return (
        <div className="content-form mt-8">
            <p className="title min-w-[100%]">Description de votre projet <span>Champ requis</span></p>
            <div className="text-editor">
                <EditorToolbar />
                <ReactQuill
                    ref={quillRef}
                    defaultValue={content}
                    onChange={handleChange}
                    placeholder={"Décrivez votre projet..."}
                    modules={modules}
                    formats={formats}
                />
                <div className="field-infos ml-auto">{count} / 10 000 caractères</div>
            </div>
        </div>
    )
}

export default Content