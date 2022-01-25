import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { deleteBio } from "../../../../../actions/user.action.delete";
// import Swal from "sweetalert2";
import { updateCategory } from "../../../../actions/project.action";

const Category = ({ props, id }) => {
    const [category, setCategory] = useState(props)
    const [updateCategoryForm, setUpdateCategoryForm] = useState(false)
    const [value, setValue] = React.useState("")
    const dispatch = useDispatch()
    const wrapperRef = useRef()
    const [displaySelection, setDisplaySelection] = useState(false)

    const hideCategoryUpdater = () => { setUpdateCategoryForm(false) }

    const handleCategory = () => {
        dispatch(updateCategory(id, category))
        setUpdateCategoryForm(false)
    }

    const openCategory = (e) => {
        setValue(e.target.value)
        setCategory(e.target.value)
        setDisplaySelection(false)
    }

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDisplaySelection(false);
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-info">
            {!updateCategoryForm ? (
                <>
                    <p>{props}</p>
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