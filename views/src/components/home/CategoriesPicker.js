import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import { categories } from '../../api/categories'
import { addBodyClass, removeBodyClass, addClass } from '../Utils'

const CategoriesPicker = ({ open, setOpen, setDatas, className }) => {
    const [active, setActive] = useState(0)

    const handleCategory = (e) => {
        setDatas(data => ({ ...data, category: e.target.dataset.category }))
        setActive(e.target.dataset.category)
        setOpen(false)
    }

    useEffect(() => {
        if (window.matchMedia('(max-width: 992px)').matches && open) {
            addBodyClass('no-scroll-y')
        } else removeBodyClass('no-scroll-y')
    }, [open])

    return (
        open && (
            <div className={`${className ? "categories_container " + className : "categories_container"} custom-scrollbar`}>
                <div className="categories_header">
                    <div className="move-back md:hidden" onClick={() => setOpen(false)}>
                        <Icon name="ArrowLeft" />
                    </div>
                    <h4>Catégories</h4>
                </div>
                <div className="categories_inner">
                    <div className="categories_col">
                        {categories.slice(0, 4).map((category, key) => {
                            return (
                                <div
                                    className={`categories_item ${addClass(active === category.name, "active")}`}
                                    onClick={e => handleCategory(e)}
                                    data-category={category.name}
                                    key={key}
                                >
                                    {category.name} <Icon name="CaretRight" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="categories_col">
                        {categories.slice(4, 8).map((category, key) => {
                            return (
                                <div
                                    className={`categories_item ${addClass(active === category.name, "active")}`}
                                    onClick={e => handleCategory(e)}
                                    data-category={category.name}
                                    key={key}
                                >
                                    {category.name} <Icon name="CaretRight" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="categories_col">
                        {categories.slice(8, 12).map((category, key) => {
                            return (
                                <div
                                    className={`categories_item ${addClass(active === category.name, "active")}`}
                                    onClick={e => handleCategory(e, category.name)}
                                    data-category={category.name}
                                    key={key}
                                >
                                    {category.name} <Icon name="CaretRight" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="categories_col">
                        {categories.slice(12, categories.length).map((category, key) => {
                            return (
                                <div
                                    className={`categories_item ${addClass(active === category.name, "active")}`}
                                    onClick={e => handleCategory(e, category.name)}
                                    data-category={category.name}
                                    key={key}
                                >
                                    {category.name} <Icon name="CaretRight" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="categories_bottom_link">
                    <Link to="/all">
                        Voir tous les projets <Icon name="DoubleArrowRight" />
                    </Link>
                </div>
            </div>
        )
    )
}

export default CategoriesPicker