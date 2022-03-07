import React, { useRef, useState } from 'react'
import { BasicInput, BasicInputEndIcon } from '../../tools/components/Inputs';
import { useClickOutside } from "../../tools/functions/useClickOutside";
import { BsCaretDownFill } from 'react-icons/bs'
import Categories from '../../home/Categories';
import { IconButton } from "../../tools/components/Button";
import { IoMdArrowRoundForward } from 'react-icons/io'

const Title = ({ title, setTitle, category, setCategory, titleError, categoryError, onNext }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)

    return (
        <div className="w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-custom dark:shadow-lg text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Un titre clair et cours est le meilleur moyen de vous faire repérer !</h3>
            <div className="w-full">
                <p className="mb-2">Quel est le titre de votre project ?</p>
                <BasicInput
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titre du projet"
                    fullwidth
                    onChange={(e) => setTitle(e.target.value)} value={title}
                />
                <div className="error" ref={titleError}></div>
            </div>

            <div className="w-full mt-3">
                <p className="mb-2">Catégorie</p>
                <div className="relative" ref={wrapperRef}>
                    <BasicInputEndIcon
                        readOnly
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Choisissez une categorie"
                        fullwidth
                        endIcon={<BsCaretDownFill className="h-[18px] w-[18px] mt-2 text-gray-500" />}
                        onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    {display && (
                        <Categories open={display} setOpen={setDisplay} setCategory={setCategory} style={{ top: 0 }}/>
                    )}
                </div>
            </div>
            <div className="error" ref={categoryError}></div>
            <IconButton text="Next" endIcon={<IoMdArrowRoundForward className="w-6 h-6" />} className="mt-4 ml-auto w-[90px]" onClick={onNext} />
        </div>
    )
}

export default Title