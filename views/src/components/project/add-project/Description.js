import React from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";

const Description = ({ content, setContent, contentError }) => {
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
    }

    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-xl text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Il est temps d'expliquer votre projet en détail !</h3>
            <div className="content-container">
                <p className="mb-2">Description de votre projet</p>

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