import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import Categories from '../../../home/Categories'
import { ErrorCard } from '../../../tools/components/Error'
import { DoubleIconInput, ClassicInput, Textarea } from '../../../tools/components/Inputs'
import { BiCategory } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'

const Title = ({ title, setTitle, subtitle, setSubtitle, isErr, error, category, setCategory }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const checkErr = (name) => { if (isErr === name) return "err" }

    return (
        <>
            <div className="content-form">
                <p className="title full">Titre <span>Champ requis</span></p>
                <ClassicInput className={`full ${checkErr("title")}`} type="text" placeholder="Titre du projet" onChange={(e) => setTitle(e.target.value)} value={title} />
                <div className="field-infos full">{title.length} / 100 caractères</div>
                {isErr === "title" && <ErrorCard useRef={errorRef} display={(isErr === "title").toString()} text={error} />}
            </div>

            <div className="content-form mt-4">
                <p className="title full">Sous-titre <span>Champ requis</span></p>
                <Textarea className={`full ${checkErr("subtitle")}`} type="text" placeholder="Sous-titre du projet" onChange={(e) => setSubtitle((e.target.value).substring(0, 100))} value={subtitle} />
                <div className="field-infos full">{subtitle.length} / 100 caractères</div>
                {isErr === "subtitle" && <ErrorCard useRef={errorRef} display={(isErr === "subtitle").toString()} text={error} />}
            </div>

            <div className="content-form mt-4">
                <p className="title full">Catégorie <span>Champ requis</span></p>
                <div className="relative" ref={wrapperRef}>
                    <DoubleIconInput className={`full ${checkErr("category")}`} readOnly placeholder="Catégorie" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} startIcon={<BiCategory />} endIcon={<BsCaretDownFill />} />
                    {display && (
                        <Categories open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
                    )}
                </div>
                {isErr === "category" && <ErrorCard useRef={errorRef} display={(isErr === "category").toString()} text={error} />}
            </div>
        </>
    )
}

export default Title