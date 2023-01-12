import React, { useState, useRef } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../tools/editor/EditorToolbar";

const Content = ({ content, setContent }) => {
    const [count, setCount] = useState(0)
    const quillRef = useRef()

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents())
        setCount(editor.getText().length - 1)

        quillRef.current.getEditor().on('text-change', () => {
            if (editor.getLength() > 100000) {
                quillRef.current.getEditor().deleteText(100000, editor.getLength());
            }
        })
        console.log(content)
    }

    return (
        <div className="add-project-card">
            <div className="flex-card mb-5">
                <div>
                    <h3 className="mb-2">Description</h3>
                    <p>Décrivez ce que vous souhaitez financier en évoquant l'importance que votre projet revêt à vos yeux et comment vous comptez le réaliser.
                        Parlez aussi un peu de vous. Une description complète informe les contributeurs sur l'ensemble de votre projet.
                        Si possible, ajoutez des images pour montrer votre travail et les récompenses que vous comptez produire.</p>
                </div>
            </div>
            <div className="content-form">
                <p className="title min-w-[100%] flex !justify-end"><span>Champ requis</span></p>
                <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                        ref={quillRef}
                        style={{ height: 400 }}
                        value={content}
                        onChange={handleChange}
                        placeholder="Il est temps de décrire votre projet !"
                        modules={modules}
                        formats={formats}
                    />
                    <div className="field_infos ml-auto">{count} / 100 000 caractères</div>
                </div>
            </div>
        </div>
    )
}

export default Content