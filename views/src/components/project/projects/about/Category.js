import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { Button, SmallToolsBtn, TextButton } from "../../../tools/components/Button";
import { ClassicInput } from "../../../tools/components/Inputs";
import Categories from '../../../home/Categories'
import { FaPen } from 'react-icons/fa'

const Category = ({ project }) => {
    const [category, setCategory] = useState(project.category)
    const [form, setForm] = useState(false)
    const [display, setDisplay] = useState(false)
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false)

    const handleCategory = () => {
        dispatch(updateCategory(project._id, category))
        setForm(false)
    }

    return (
        <div className="dashboard-about-content-item">
            <div className="label">Catégorie</div>
            {!form ? (
                <div className="content">
                    <div className="title">{project.category}</div>
                    <SmallToolsBtn onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>
                </div>
            ) : (
                <>
                    <div className="content-form">
                        <ClassicInput readOnly className="title-input" type="text" value={category} onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} />
                        {display && (
                            <Categories open={display} setOpen={setDisplay} category={category} setCategory={setCategory} />
                        )}
                        <div className="btn-container">
                            <TextButton text="Annuler" className="mx-2" onClick={() => setForm(false)} />
                            <Button text="Valider" disabled={category === project.category} onClick={handleCategory} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Category;