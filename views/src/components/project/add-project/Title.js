import React, { useRef, useState } from 'react'
import { ClassicInput, DoubleIconInput } from '../../tools/components/Inputs';
import { useClickOutside } from "../../tools/functions/useClickOutside";
import { BsCaretDownFill } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import Categories from '../../home/Categories';
import { EndIconButton } from "../../tools/components/Button";
import { IoMdArrowRoundForward } from 'react-icons/io'
import { ErrorCard } from '../../tools/components/Error';

const Title = ({ title, setTitle, category, setCategory, error, setError, isErr, setErr, onNext }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const checkErr = (name) => { if (isErr === name) return "err"}

    const checkValues = () => {
        if (title.length < 10 || title.length > 100) {
            setErr("title")
            setError(`Le titre de votre projet doit être compris entre 10 et 100 charactères. Longueur actuelle : ${title.length}`)
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

    return (
        <div className="add-project-card">
            <h2>Un titre clair et cours est le meilleur moyen de vous faire repérer !</h2>
            <div className="content-form">
                <p className="title">Titre <span>Champ requis</span></p>
                <ClassicInput className={`title-input ${checkErr("title")}`} type="text" placeholder="Titre du projet" onChange={(e) => setTitle(e.target.value)} value={title} />
                <div className="title-infos">{title.length} / 100 caractères</div>
                {isErr === "title" && <ErrorCard useRef={errorRef} show={isErr === "title"} text={error} />}
            </div>

            <div className="content-form mt-4">
                <p className="title">Catégorie <span>Champ requis</span></p>
                <div className="relative" ref={wrapperRef}>
                    <DoubleIconInput className={`${checkErr("category")}`} readOnly placeholder="Catégorie" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} startIcon={<BiCategory />} endIcon={<BsCaretDownFill />} />
                    {display && (
                        <Categories open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
                    )}
                </div>
            </div>
            {isErr === "category" && <ErrorCard useRef={errorRef} show={isErr === "category"} text={error} />}
            <div className="btn-container">
                <EndIconButton text="Suivant" className="next-btn right" disabled={title.length < 10 || title.length > 100 || category.length === 0} icon={<IoMdArrowRoundForward />} onClick={checkValues} />
            </div>
        </div>
    )
}

export default Title