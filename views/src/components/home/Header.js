import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import MapModal from '../tools/map/MapModal';
import LocationsAutocomplete from './LocationsAutocomplete';
import CategoriesPicker from './CategoriesPicker';
import { IconToggle, Button, TextButton } from '../tools/global/Button';
import { DropdownInput, IconInput } from '../tools/global/Inputs';
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { IoAlbums } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { GiFrance } from 'react-icons/gi';

const Header = ({ user, search, category, setCategory, location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation, date, setDate, state, setState }) => {
    const [openCategories, setOpenCategories] = useState(false)
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, () => setOpenCategories(false))

    const datesMenu = useRef()
    const [byDate, setByDate] = useState(false)
    useClickOutside(datesMenu, () => setByDate(false))

    const stateMenu = useRef()
    const [byState, setByState] = useState(false)
    useClickOutside(stateMenu, () => setByState(false))

    const [moreFilters, setMoreFilters] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setRecentLocations(JSON.parse(locationsStored))
    }, [locationsStored, setRecentLocations])

    return (
        <div id="header">
            <div className="container py-8">
                <div className="header_container row">
                    <div className="col-12 col-lg-6 lg:pr-5">
                        <h1><span>Donner vie</span><br />aux bonnes idées</h1>
                        <p>Circa hos dies Lollianus primae lanuginis adulesce, lampadi filius ex praefecto, exploratius causam Maximino spectante.</p>
                        <Button className="btn_icon_start">
                            <Link to="/add-project">
                                <AiOutlinePlus />Déposer un projet
                            </Link>
                        </Button>
                    </div>
                    <div className="col-12 col-lg-6 pt-5 lg:pt-0 lg:pl-5 relative flex flex-col justify-center">
                        <IconInput
                            className="is_start_icon mb-3"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<BiSearchAlt />}
                        />
                        <div className="relative row my-3">
                            <div className="col-12 col-sm-6 sm:!pr-1 sm:pb-0 pb-3" ref={categoriesRef}>
                                <IconInput
                                    className="is_start_icon"
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
                            <div className="col-12 col-sm-6 sm:!pl-1">
                                <IconInput
                                    className="is_start_icon"
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
                            <div className="row !my-3">
                                <div className="col-6 !pr-1">
                                    <DropdownInput useRef={datesMenu} readOnly placeholder="Date de mise en ligne" value={date} open={byDate} onClick={() => setByDate(!byDate)} cross clean={() => setDate("")}>
                                        <div onClick={() => setDate("Moins d'un jour")}>Moins d'un jour</div>
                                        <div onClick={() => setDate("Moins d'une semaine")}>Moins d'une semaine</div>
                                        <div onClick={() => setDate("Moins d'un mois")}>Moins d'un mois</div>
                                        <div onClick={() => setDate("Moins d'un an")}>Moins d'un an</div>
                                    </DropdownInput>
                                </div>
                                <div className="col-6 !pl-1">
                                    <DropdownInput useRef={stateMenu} readOnly placeholder="État" value={state} open={byState} onClick={() => setByState(!byState)} cross clean={() => setState("")}>
                                        <div onClick={() => setState("En préparation")}>En préparation</div>
                                        <div onClick={() => setState("En cours")}>En cours</div>
                                        <div onClick={() => setState("Terminé")}>Terminé</div>
                                    </DropdownInput>
                                </div>
                            </div>
                        }
                        <div className="btn-container flex justify-between items-center pt-3">
                            <div className="hidden sm:flex">
                                <TextButton className="btn_icon_start primary mr-2" onClick={() => setOpenMapModal(true)}><GiFrance />Voir la carte</TextButton>
                                <TextButton className="btn_icon_start" onClick={() => setMoreFilters(!moreFilters)}
                                >{!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />}{!moreFilters ? "Plus de filtres" : "Moins de filtres"}</TextButton>
                            </div>
                            <div className="flex sm:hidden">
                                <IconToggle className="primary mr-2" icon={<GiFrance />} onClick={() => setOpenMapModal(true)} />
                                <IconToggle className="primary" icon={!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />} onClick={() => setMoreFilters(!moreFilters)} />
                            </div>
                            <Button className="btn_icon_end" onClick={search}>Rechercher<MdOutlineDoubleArrow /></Button>
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} />
        </div>
    )
}

export default Header