import React, { useState, useRef } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../../tools/editor/EditorToolbar";

const Content = ({ content, setContent, contentChanged, setContentChanged }) => {
    const [count, setCount] = useState(0)
    const quillRef = useRef()

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents())
        setCount(editor.getText().length - 1)
        if (!contentChanged) setContentChanged(true)

        quillRef?.current?.getEditor().on('text-change', () => {
            if (editor.getLength() > 100000) {
                quillRef.current.getEditor().deleteText(100000, editor.getLength());
            }
        })
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
                    placeholder="Décrivez votre projet..."
                    modules={modules}
                    formats={formats}
                />
                <div className="field_infos ml-auto">{count} / 100 000 caractères</div>
            </div>
        </div>
    )
}

export default Content