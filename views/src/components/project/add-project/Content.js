import React, { useState, useRef } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';

const Content = ({ content, setContent, onNext, onBack }) => {
    const [count, setCount] = useState(0)
    const quillRef = useRef()

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents())
        setCount(editor.getText().length - 1)
        // const regexp = new RegExp("fils de pute", 'i');
        // let isString = content.ops.filter(element => regexp.test(element.insert))
        quillRef.current.getEditor().on('text-change', () => {
            if (editor.getLength() > 10000) {
                quillRef.current.getEditor().deleteText(10000, editor.getLength());
            }
        })
    }

    return (
        <div className="add-project-card">
            <h2>Il est temps de décrire votre projet en détail !</h2>
            <div className="flex-card mb-5">
                <div>
                    <h3>Description</h3>
                    <p>Décrivez ce que vous souhaitez financier en évoquant l'importance que votre projet revêt à vos yeux et comment vous comptez le réaliser.
                        Parlez aussi un peu de vous. Une description complète informe les contributeurs sur l'ensemble de votre projet.
                        Si possible, ajoutez des images pour montrer votre travail et les récompenses que vous comptez produire.</p>
                </div>
            </div>
            <div className="content-form">
                <p className="title min-w-[100%]">Description de votre projet <span>Champ requis</span></p>
                <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                        ref={quillRef}
                        style={{ height: 300 }}
                        value={content}
                        onChange={handleChange}
                        placeholder={"Il est temps de décrire votre projet !"}
                        modules={modules}
                        formats={formats}
                    />
                    <div className="field-infos ml-auto">{count} / 10 000 caractères</div>
                </div>
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="next-btn" disabled={count < 10 || count > 10000} icon={<IoMdArrowRoundForward />} onClick={onNext} />
            </div>
        </div>
    )
}

export default Content