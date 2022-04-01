import React, { useState } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';

const Description = ({ content, setContent, onNext, onBack }) => {
    const [count, setCount] = useState(0)
    
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents())
        setCount(editor.getText().length - 1)
    }

    return (
        <div className="add-project-card">
            <h2>Il est temps de décrire votre projet en détail !</h2>
            <div className="content-form">
                <p className="title min-w-[100%]">Description de votre projet <span>Champ requis</span></p>
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
                    <div className="title-infos ml-auto">{count} / 10 000 caractères</div>
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="next-btn" disabled={count < 10 || count > 10000} icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default Description