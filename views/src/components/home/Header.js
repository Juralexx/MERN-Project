import React, { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../tools/functions/useClickOutside';
import HeaderNavbar from '../HeaderNavBar'
import MapModal from '../tools/map/MapModal';
import LocationsAutocomplete from './LocationsAutocomplete';
import CategoriesPicker from './CategoriesPicker';
import { EndIconButton, TextButton } from '../tools/components/Button';
import { IoSend, IoAlbums } from 'react-icons/io5'
import { IconInput } from '../tools/components/Inputs';
import { BiSearchAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'

const Header = ({ user, search, category, setCategory, location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation }) => {
    const [openCategories, setOpenCategories] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, setOpenCategories, false)
    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setRecentLocations(JSON.parse(locationsStored))
    }, [locationsStored])

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
                            icon={<BiSearchAlt />}
                        />
                        <div className="header-input-flex"> 
                            <div ref={categoriesRef}>
                                <IconInput
                                    className="is-start-icon"
                                    inputClassName="cursor-pointer"
                                    placeholder="Catégorie"
                                    readOnly
                                    icon={<IoAlbums />}
                                    endIcon={<BsCaretDownFill />}
                                    onClick={() => setOpenCategories(!openCategories)}
                                    onChange={() => setCategory(category)}
                                    value={category}
                                />
                                <CategoriesPicker className="top-[56px]" open={openCategories} setOpen={setOpenCategories} category={category} setCategory={setCategory} />
                            </div>
                            <div>
                                <IconInput
                                    className="is-start-icon"
                                    placeholder="Métier"
                                    type="text"
                                    fullwidth
                                    icon={<FaUserShield />}
                                />
                            </div>
                        </div>
                        <LocationsAutocomplete
                            location={location}
                            setLocation={setLocation}
                            recentLocations={recentLocations}
                            setRecentLocations={setRecentLocations}
                            aroundLocation={aroundLocation}
                            setAroundLocation={setAroundLocation}
                        />
                        <div className="btn-container">
                            <TextButton text="Voir la carte" onClick={() => setOpenMapModal(true)} />
                            <EndIconButton className="px-7" text="Rechercher" icon={<IoSend />} onClick={search} />
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} />
            <HeaderNavbar />
        </div>
    )
}

export default Header