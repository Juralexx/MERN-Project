import React, { useRef, useState } from 'react'
import { ClassicInput, DoubleIconInput, Textarea } from '../../tools/components/Inputs';
import { useClickOutside } from "../../tools/functions/useClickOutside";
import { BsCaretDownFill } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import CategoriesPicker from '../../home/CategoriesPicker';
import { EndIconButton } from "../../tools/components/Button";
import { IoMdArrowRoundForward } from 'react-icons/io'
import { ErrorCard } from '../../tools/components/Error';

const Title = ({ title, setTitle, subtitle, setSubtitle, category, setCategory, error, setError, isErr, setErr, onNext }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const checkErr = (name) => { if (isErr === name) return "err" }

    const checkValues = () => {
        if (title.length < 10 || title.length > 60) {
            setErr("title")
            setError(`Le titre de votre projet doit être compris entre 10 et 60 charactères. Longueur actuelle : ${title.length}`)
        } else {
            if (subtitle.length < 10 || subtitle.length > 100) {
                setErr("subtitle")
                setError(`Le sous-titre de votre projet doit être compris entre 10 et 100 charactères. Longueur actuelle : ${subtitle.length}`)
            } else {
                if (category.length <= 0) {
                    setErr("category")
                    setError("Veuillez selectionner une catégorie.")
                } else {
                    setErr(null)
                    onNext()
                }
            }
        }
    }

    return (
        <div className="add-project-card">
            <h2>Un titre clair et cours est le meilleur moyen de vous faire repérer !</h2>
            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Titre <span>Champ requis</span></p>
                        <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre du projet" onChange={(e) => setTitle((e.target.value).substring(0, 60))} value={title} />
                        <div className="field-infos full">{title.length} / 60 caractères</div>
                        {isErr === "title" && <ErrorCard useRef={errorRef} display={isErr === "title"} text={error} clean={() => setErr("")} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Titre du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>

            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Sous-titre <span>Champ requis</span></p>
                        <Textarea className={`full ${checkErr("subtitle")}`} type="text" placeholder="Sous-titre du projet" onChange={(e) => setSubtitle((e.target.value).substring(0, 100))} value={subtitle} />
                        <div className="field-infos full">{subtitle.length} / 100 caractères</div>
                        {isErr === "subtitle" && <ErrorCard useRef={errorRef} display={isErr === "subtitle"} text={error} clean={() => setErr("")} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Sous-titre du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>

            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Catégorie <span>Champ requis</span></p>
                        <div className="relative" ref={wrapperRef}>
                            <DoubleIconInput className={`full ${checkErr("category")}`} readOnly placeholder="Catégorie" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} startIcon={<BiCategory />} endIcon={<BsCaretDownFill />} />
                            {display && (
                                <CategoriesPicker open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
                            )}
                        </div>
                        {isErr === "category" && <ErrorCard useRef={errorRef} display={isErr === "category"} text={error} clean={() => setErr("")} />}
                    </div>
                </div>
                <div className="card-right">
                    <h3>Catégorie</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
            <div className="btn-container">
                <EndIconButton text="Suivant" className="next-btn right" disabled={title.length < 10 || title.length > 60 || subtitle.length < 10 || subtitle.length > 100 || category.length === 0} icon={<IoMdArrowRoundForward />} onClick={checkValues} />
            </div>
        </div>
    )
}

export default Title