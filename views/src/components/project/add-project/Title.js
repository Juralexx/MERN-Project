import React, { useRef, useState } from 'react'
import { useClickOutside } from "../../tools/functions/useClickOutside";

const Title = ({ title, setTitle, category, setCategory, titleError, categoryError }) => {
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()

    useClickOutside(wrapperRef, setDisplay, false)

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setDisplay(false)
    }

    return (
        <div className="add-title-category-bloc add-project-bloc">
            <h3>Un titre clair et cours est le meilleur moyen de vous faire repérer !</h3>
            <label htmlFor="title"><span>Quel est le titre de votre project ?</span><small>Champ requis</small></label>
            <div className="input-container">
                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div className="error" ref={titleError}></div>

            <label htmlFor="category"><span>Catégorie</span><small>Champ requis</small></label>
            <div className="input-container">
                <div ref={wrapperRef}>
                    <input readOnly type="text" name="category" id="category" onClick={() => setDisplay(!display)} onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Choisissez une categorie" />
                    {display && (
                        <div className="category-selection">
                            <option value="category 1" onClick={handleCategory}>Category 1</option>
                            <option value="category 2" onClick={handleCategory}>Category 2</option>
                            <option value="category 3" onClick={handleCategory}>Category 3</option>
                            <option value="category 4" onClick={handleCategory}>Category 4</option>
                        </div>
                    )}
                </div>
            </div>
            <div className="error" ref={categoryError}></div>
        </div>
    )
}

export default Title