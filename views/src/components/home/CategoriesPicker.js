import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../api/categories'
import { ImArrowLeft2 } from 'react-icons/im'
import { addBodyClass, removeBodyClass, addClass } from '../Utils'
import { MdOutlineArrowForwardIos, MdOutlineArrowRightAlt } from 'react-icons/md'

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
                                <div
                                    className={`categories_item ${addClass(active === category.name, "active")}`}
                                    onClick={e => handleCategory(e)}
                                    data-category={category.name}
                                    key={key}
                                >
                                    {category.name} <MdOutlineArrowForwardIos />
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
                                    {category.name} <MdOutlineArrowForwardIos />
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
                                    {category.name} <MdOutlineArrowForwardIos />
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
                                    {category.name} <MdOutlineArrowForwardIos />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="categories_bottom_link">
                    <Link to="/">
                        Voir tous les projets <MdOutlineArrowRightAlt className='w-6 h-6' />
                    </Link>
                </div>
            </div>
        )
    )
}

export default CategoriesPicker