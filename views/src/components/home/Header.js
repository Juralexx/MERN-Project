import React, { useState, useRef } from 'react'
import { useClickOutside } from '../tools/functions/useClickOutside';
import HeaderNavbar from '../HeaderNavBar'
import Categories from './Categories'
import MapModal from '../tools/map/MapModal';
import { EndIconButton, TextButton } from '../tools/components/Button';
import { IoSend } from 'react-icons/io5'
import { IconInput } from '../tools/components/Inputs';
import { GoSearch } from 'react-icons/go'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'

const Header = () => {
    const [openCategoriesPicker, setOpenCategoriesPicker] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")
    const [department, setDepartment] = useState("")
    const [region, setRegion] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, setOpenCategoriesPicker, false)

    return (
        <div id="header">
            <div className="header-container">
                <div className="header-inner">
                    <div className="header-inner-left">
                        <h1>Where <span>all projects</span><br />become <span>reality</span></h1>
                        <p> Circa hos dies Lollianus primae lanuginis adulesce, lampadi filius ex praefecto, exploratius causam Maximino spectante, convictus codicem noxiarum artium nondum per aetatem</p>
                    </div>
                    <div className="header-inner-right">
                        <IconInput
                            className="is-start-icon"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<GoSearch />}
                        />
                        <div className="header-input-flex">
                            <div ref={categoriesRef}>
                                <IconInput
                                    className="is-start-icon"
                                    placeholder="Catégorie"
                                    readOnly
                                    icon={<BiCategoryAlt />}
                                    endIcon={<BsCaretDownFill />}
                                    onClick={() => setOpenCategoriesPicker(!openCategoriesPicker)}
                                    onChange={() => setCategory(category)}
                                    value={category}
                                />
                                <Categories className="top-[56px]" open={openCategoriesPicker} setOpen={setOpenCategoriesPicker} category={category} setCategory={setCategory} />
                            </div>
                            <div>
                                <IconInput
                                    className="is-start-icon"
                                    placeholder="Métier"
                                    type="text"
                                    fullwidth
                                    icon={<MdWork />}
                                />
                            </div>
                        </div>
                        <IconInput
                            className="is-start-icon"
                            placeholder="Localisation"
                            type="text"
                            fullwidth
                            icon={<FaMapMarkerAlt />}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="btn-container">
                            <TextButton text="Voir la carte" onClick={() => setOpenMapModal(true)} />
                            <EndIconButton className="px-7" text="Rechercher" icon={<IoSend />} />
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} department={department} setDepartment={setDepartment} region={region} setRegion={setRegion} newRegion={newRegion} setNewRegion={setNewRegion} />
            <HeaderNavbar />
        </div>
    )
}

export default Header