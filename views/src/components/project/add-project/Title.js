import React, { useRef, useState } from 'react'
import { ClassicInput, IconInput, Textarea } from '../../tools/global/Inputs';
import { useClickOutside } from "../../tools/hooks/useClickOutside";
import { BsCaretDownFill } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import CategoriesPicker from '../../home/CategoriesPicker';
import { ErrorCard } from '../../tools/global/Error';

const Title = ({ title, setTitle, subtitle, setSubtitle, category, setCategory, error, isErr, setErr }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, () => setDisplay(false))
    const checkErr = (name) => { if (isErr === name) return "err" }

    return (
        <div className="add-project-card">
            <h2>Titre, sous-titre et catégorie</h2>
            <div className="flex-card">
                <div className="card-left">
                    <div className="content-form">
                        <p className="title full">Titre <span>Champ requis</span></p>
                        <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre du projet" onChange={(e) => setTitle((e.target.value).substring(0, 60))} value={title} />
                        <div className="field_infos full">{title.length} / 60 caractères</div>
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
                        <Textarea className={`w-full small ${checkErr("subtitle")}`} type="text" placeholder="Sous-titre du projet" onChange={(e) => setSubtitle((e.target.value).substring(0, 100))} value={subtitle} />
                        <div className="field_infos full">{subtitle.length} / 100 caractères</div>
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
                            <IconInput className={`full ${checkErr("category")}`} readOnly placeholder="Catégorie" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} startIcon={<BiCategory />} endIcon={<BsCaretDownFill />} />
                            {display && (
                                <CategoriesPicker className="no_bottom" open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
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
        </div>
    )
}

export default Title