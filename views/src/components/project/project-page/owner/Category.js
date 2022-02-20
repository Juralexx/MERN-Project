import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";

const Category = ({ props, id }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [category, setCategory] = useState(props)
    const [updateCategoryForm, setUpdateCategoryForm] = useState(false)
    const [value, setValue] = useState(false)
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    const [displaySelection, setDisplaySelection] = useState(false)
    const [modified, setModified] = useState(false)

    const hideCategoryUpdater = () => { setUpdateCategoryForm(false) }

    const handleCategory = () => {
        dispatch(updateCategory(id, category))
        setUpdateCategoryForm(false)
        setModified(true)
    }

    const openCategory = (e) => {
        setValue(true)
        setCategory(e.target.value)
        setDisplaySelection(false)
    }

    useClickOutside(wrapperRef, setDisplaySelection)

    return (
        <div className="user-info">
            {!updateCategoryForm ? (
                <>
                    {modified ? ( <p>{projectData.category}</p> ) : ( <p>{props}</p> )}
                    <div className="btn-container">
                        {/* <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button> */}
                        <button className="btn btn-primary" onClick={() => setUpdateCategoryForm(!updateCategoryForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <div ref={wrapperRef}>
                        <input readOnly type="text" name="category" id="category" onClick={() => setDisplaySelection(!displaySelection)} onInput={(e) => setCategory(e.target.value)} defaultValue={category} placeholder={props}/>
                        {displaySelection && (
                            <div className="category-selection">
                                <option value="category 1" onClick={openCategory}>Category 1</option>
                                <option value="category 2" onClick={openCategory}>Category 2</option>
                                <option value="category 3" onClick={openCategory}>Category 3</option>
                                <option value="category 4" onClick={openCategory}>Category 4</option>
                            </div>
                        )}
                    </div>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideCategoryUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleCategory}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Category;