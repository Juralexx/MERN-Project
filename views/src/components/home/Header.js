import React, { useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { BiMap, BiSearchAlt } from 'react-icons/bi'
import Categories from './Categories'

const Header = () => {
    const [openCategorieBloc, setOpenCategorieBloc] = useState(false)
    const openCategories = () => {
        return (
            <Categories />
        )
    }

    return (
        <div id='header'>
            <div className="header-inner">
                <div className="search-container">
                    <div className="input-container">
                        <div role="button" className="header-categories-btn" onClick={() => setOpenCategorieBloc(!openCategorieBloc)}>
                            <div><AiOutlineAlignLeft /> Catégories</div>
                            <BsCaretDownFill />
                        </div>
                        <div className="header-search-input">
                            <BiSearchAlt />
                            <input type="search" placeholder="Rechercher..." />
                        </div>
                        <div className="header-location-input">
                            <BiMap />
                            <input type="search" placeholder="Saisissez une localité..." />
                        </div>
                    </div>
                {openCategorieBloc && openCategories()}
                </div>
            </div>
        </div>
    )
}

export default Header