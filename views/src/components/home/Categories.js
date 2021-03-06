import React, { useState } from 'react';
import { BsFillSunFill, BsFillCaretRightFill } from 'react-icons/bs'

const Categories = ({ open, setOpen, setCategory, category, className }) => {
    const [active, setActive] = useState(0)
    const isMainActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const isSubActive = (value) => { if (category === value) return "active" }

    const categories = [
        { value: "Category One" },
        { value: "Category Two" },
        { value: "Category Three" },
        { value: "Category Four" },
        { value: "Category Five" },
        { value: "Category Six" },
        { value: "Category Seven" },
    ]

    const handleCategory = (e) => {
        setCategory(e.target.dataset.category)
        setOpen(false)
    }

    return (
        open && (
            <div className={`${className ? "categories_picker " + className : "categories_picker"}`}>
                <div className="categories_main">
                    {categories.map((category, key) => {
                        return (
                            <div className={`categories_main_inner ${isMainActive(active === key, "active")}`} key={key}>
                                <div className="categories_main_item" onClick={() => setActive(key)}>
                                    <div className="left"><BsFillSunFill />{category.value}</div>
                                    <div className="right"><BsFillCaretRightFill /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="categories_sub">
                    {active === 0 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory three")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                        </>
                    )}
                    {active === 1 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                        </>
                    )}
                    {active === 2 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory three")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory four")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory four">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory five")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory five">Subcategory three</div>
                        </>
                    )}
                    {active === 3 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory three")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                        </>
                    )}
                    {active === 4 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                        </>
                    )}
                    {active === 5 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory three")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory four")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory four">Subcategory three</div>
                        </>
                    )}
                    {active === 6 && (
                        <>
                            <div className={`categories_sub_item ${isSubActive("Subcategory one")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory one">Subcategory one</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory two")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory two">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory three")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory three">Subcategory three</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory four")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory four">Subcategory two</div>
                            <div className={`categories_sub_item ${isSubActive("Subcategory five")}`} onClick={(e) => handleCategory(e)} data-category="Subcategory five">Subcategory three</div>
                        </>
                    )}
                </div>
            </div>
        )
    )
}

export default Categories