import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../api/categories'
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'

const CategoriesPicker = ({ open, setOpen, setCategory, category, className }) => {
    const [active, setActive] = useState(0)
    const isActive = (state, classe) => { if (state) { return classe } else { return "" } }

    const handleCategory = (e, key) => {
        setCategory(e.target.dataset.category)
        setActive(key)
        setOpen(false)
    }

    return (
        open &&
        <div className={`${className ? "categories_container " + className : "categories_container"}`}>
            <div className="categories_header">
                <div className="move-back md:hidden" onClick={() => setOpen(false)}>
                    <ImArrowLeft2 />
                </div>
                <h4>Catégories</h4>
            </div>
            <div className="categories_inner">
                <div className="categories_col">
                    {categories.slice(0, 4).map((category, key) => {
                        return (
                            <div className={`categories_item ${isActive(active === category.name, "active")}`} onClick={e => handleCategory(e, category.name)} data-category={category.name} key={key}>
                                {category.name} <ImArrowRight2 />
                            </div>
                        )
                    })}
                </div>
                <div className="categories_col">
                    {categories.slice(4, 8).map((category, key) => {
                        return (
                            <div className={`categories_item ${isActive(active === category.name, "active")}`} onClick={e => handleCategory(e, category.name)} data-category={category.name} key={key}>
                                {category.name} <ImArrowRight2 />
                            </div>
                        )
                    })}
                </div>
                <div className="categories_col">
                    {categories.slice(8, 12).map((category, key) => {
                        return (
                            <div className={`categories_item ${isActive(active === category.name, "active")}`} onClick={e => handleCategory(e, category.name)} data-category={category.name} key={key}>
                                {category.name} <ImArrowRight2 />
                            </div>
                        )
                    })}
                </div>
                <div className="categories_col">
                    {categories.slice(12, categories.length).map((category, key) => {
                        return (
                            <div className={`categories_item ${isActive(active === category.name, "active")}`} onClick={e => handleCategory(e, category.name)} data-category={category.name} key={key}>
                                {category.name} <ImArrowRight2 />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="categories_bottom_link">
                <Link to="/">Voir tous les projets <ImArrowRight2 /></Link>
            </div>
        </div>
    )
}

export default CategoriesPicker