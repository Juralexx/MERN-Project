import React from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';

const Description = ({ content, setContent, onNext, onBack }) => {
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
    }



    return (
        <div className="add-project-card">
            <h2>Il est temps de décrire votre projet en détail !</h2>
            <div className="content-form">
                <p className="mb-2">Description de votre projet</p>
                <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                        style={{ height: 300 }}
                        value={content}
                        onChange={handleChange}
                        placeholder={"Il est temps de décrire votre projet !"}
                        modules={modules}
                        formats={formats}
                    />
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="next-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="previous-btn" icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default Description