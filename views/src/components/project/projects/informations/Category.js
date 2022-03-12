import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { RoundedButton, Button } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../../tools/components/Inputs";
import Categories from '../../../home/Categories'

const Category = ({ project }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [category, setCategory] = useState(project.category)
    const [updateCategoryForm, setUpdateCategoryForm] = useState(false)
    const [displaySelection, setDisplaySelection] = useState(false)
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()
    const wrapperRef = useRef()

    const hideCategoryUpdater = () => { setUpdateCategoryForm(false) }

    const handleCategory = () => {
        dispatch(updateCategory(project._id, category))
        setUpdateCategoryForm(false)
        setModified(true)
    }

    useClickOutside(wrapperRef, setDisplaySelection, false)

    return (
        <div className="relative flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-slate-300">
            {!updateCategoryForm ? (
                <>
                    {modified ? (<p>{projectData.category}</p>) : (<p>{project.category}</p>)}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateCategoryForm(!updateCategoryForm)}>Modifier</RoundedButton>
                </>
            ) : (
                <>
                    <div ref={wrapperRef}>
                        <BasicInput readOnly type="text" value={category} onClick={() => setDisplaySelection(!displaySelection)} onChange={(e) => setCategory(e.target.dataset.category)} />

                        {displaySelection && (
                            <Categories open={displaySelection} setOpen={setDisplaySelection} category={category} setCategory={setCategory} />
                        )}
                    </div>
                    <div className="flex">
                        <Button text="Annuler" onClick={hideCategoryUpdater}>Annuler</Button>
                        <Button text="Valider" disabled={!category} onClick={handleCategory}>Enregistrer</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Category;