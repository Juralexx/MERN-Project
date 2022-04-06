import React, { useRef, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import Categories from '../../../home/Categories'
import { ErrorCard } from '../../../tools/components/Error'
import { DoubleIconInput } from '../../../tools/components/Inputs'
import { useClickOutside } from '../../../tools/functions/useClickOutside'

const Category = ({ category, setCategory, isErr, error }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)
    const checkErr = (name) => { if (isErr === name) return "err"}

    return (
        <>
            <div className="content-form">
                <p className="title full">Catégorie <span>Champ requis</span></p>
                <div className="relative" ref={wrapperRef}>
                    <DoubleIconInput className={`full ${checkErr("category")}`} readOnly placeholder="Catégorie" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} startIcon={<BiCategory />} endIcon={<BsCaretDownFill />} />
                    {display && (
                        <Categories open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
                    )}
                </div>
            </div>
            {isErr === "category" && <ErrorCard useRef={errorRef} display={(isErr === "category").toString()} text={error} />}
        </>
    )
}

export default Category