import React from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { IconButton } from '../../tools/components/Button';

const Description = ({ content, setContent, contentError, onNext, onBack }) => {
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
    }

    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-custom dark:shadow-lg text-gray-500 dark:text-slate-300">
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
            <div className="w-full flex justify-between mt-4 ">
                <IconButton text="Back" startIcon={<IoMdArrowRoundBack className="w-6 h-6" />} className="w-[90px]" onClick={onBack} />
                <IconButton text="Next" endIcon={<IoMdArrowRoundForward className="w-6 h-6" />} className="w-[90px]" onClick={onNext} />
            </div>
        </div>
    )
}

export default Description