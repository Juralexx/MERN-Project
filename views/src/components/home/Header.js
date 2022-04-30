import React, { useState, useRef, useEffect } from 'react'
import { useClickOutside } from '../tools/functions/useClickOutside';
import MapModal from '../tools/map/MapModal';
import LocationsAutocomplete from './LocationsAutocomplete';
import CategoriesPicker from './CategoriesPicker';
import { EndIconButton, StartIconTextButton } from '../tools/components/Button';
import { DropdownInput, IconInput } from '../tools/components/Inputs';
import { IoSend, IoAlbums } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { GiFrance } from 'react-icons/gi';

const Header = ({ user, search, category, setCategory, location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation, date, setDate, state, setState }) => {
    const [openCategories, setOpenCategories] = useState(false)
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, setOpenCategories, false)

    const datesMenu = useRef()
    const [byDate, setByDate] = useState(false)
    useClickOutside(datesMenu, setByDate, false)

    const stateMenu = useRef()
    const [byState, setByState] = useState(false)
    useClickOutside(stateMenu, setByState, false)

    const [moreFilters, setMoreFilters] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setRecentLocations(JSON.parse(locationsStored))
    }, [locationsStored])

    return (
        <div id="header">
            <div className="content_box">
                <div className="header_container">
                    <div className="header_left">
                        <h1>Where <span>all projects</span><br />become <span>reality</span></h1>
                        <p> Circa hos dies Lollianus primae lanuginis adulesce, lampadi filius ex praefecto, exploratius causam Maximino spectante, convictus codicem noxiarum artium nondum per aetatem</p>
                    </div>
                    <div className="header_right">
                        <IconInput
                            className="is-start_icon"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<BiSearchAlt />}
                        />
                        <div className="header_input_flex">
                            <div ref={categoriesRef}>
                                <IconInput
                                    className="is-start_icon"
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
                                    className="is-start_icon"
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
                        {moreFilters &&
                            <div className="header_input_flex">
                                <DropdownInput useRef={datesMenu} readOnly placeholder="Date de mise en ligne" value={date} open={byDate} onClick={() => setByDate(!byDate)} cross clean={() => setDate("")}>
                                    <div onClick={() => setDate("Moins d'un jour")}>Moins d'un jour</div>
                                    <div onClick={() => setDate("Moins d'une semaine")}>Moins d'une semaine</div>
                                    <div onClick={() => setDate("Moins d'un mois")}>Moins d'un mois</div>
                                    <div onClick={() => setDate("Moins d'un an")}>Moins d'un an</div>
                                </DropdownInput>
                                <DropdownInput useRef={stateMenu} readOnly placeholder="État" value={state} open={byState} onClick={() => setByState(!byState)} cross clean={() => setState("")}>
                                    <div onClick={() => setState("En préparation")}>En préparation</div>
                                    <div onClick={() => setState("En cours")}>En cours</div>
                                    <div onClick={() => setState("Terminé")}>Terminé</div>
                                </DropdownInput>
                            </div>
                        }
                        <div className="btn_container">
                            <div className="flex">
                                <StartIconTextButton text="Voir la carte" className="mr-2" icon={<GiFrance />} onClick={() => setOpenMapModal(true)} />
                                <StartIconTextButton text={!moreFilters ? "Plus de filtres" : "Moins de filtres"} icon={!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />} onClick={() => setMoreFilters(!moreFilters)} />
                            </div>
                            <EndIconButton className="px-7" text="Rechercher" icon={<IoSend />} onClick={search} />
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} />
        </div>
    )
}

export default Header