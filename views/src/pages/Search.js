import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../components/tools/hooks/useClickOutside'
import CategoriesPicker from '../components/home/CategoriesPicker'
import LocationsAutocomplete from '../components/home/LocationsAutocomplete'
import { EndIconButton, StartIconTextButton } from '../components/tools/global/Button'
import Card from '../components/tools/components/Card'
import FollowersModal from '../components/tools/components/FollowersModal'
import { DropdownInput, IconInput } from '../components/tools/global/Inputs'
import LikersModal from '../components/tools/components/LikersModal'
import MapModal from '../components/tools/map/MapModal'
import { BiSearchAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'
import { IoAlbums, IoSend } from 'react-icons/io5'
import { GiFrance } from 'react-icons/gi'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Search = ({ websocket, user, search, results, category, setCategory, location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation, date, setDate, state, setState }) => {
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const [moreFilters, setMoreFilters] = useState(false)
    const [project, setProject] = useState()

    const [openCategories, setOpenCategories] = useState(false)
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, setOpenCategories, false)

    const datesMenu = useRef()
    const [byDate, setByDate] = useState(false)
    useClickOutside(datesMenu, setByDate, false)

    const stateMenu = useRef()
    const [byState, setByState] = useState(false)
    useClickOutside(stateMenu, setByState, false)

    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setRecentLocations(JSON.parse(locationsStored))
    }, [locationsStored, setRecentLocations])

    return (
        <>
            <div className="search-page">
                <div className="search-header">
                    <div className="content_box">
                        <div className="search-header-inner">
                            <div className="header_input_flex">
                                <IconInput
                                    className="is_start_icon"
                                    placeholder="Rechercher un projet"
                                    type="search"
                                    icon={<BiSearchAlt />}
                                />
                                <div ref={categoriesRef} className="relative">
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
                            </div>
                            <div className="header_input_flex">
                                <IconInput
                                    className="is_start_icon"
                                    placeholder="Métier"
                                    type="text"
                                    fullwidth
                                    icon={<FaUserShield />}
                                />
                                <LocationsAutocomplete
                                    location={location}
                                    setLocation={setLocation}
                                    recentLocations={recentLocations}
                                    setRecentLocations={setRecentLocations}
                                    aroundLocation={aroundLocation}
                                    setAroundLocation={setAroundLocation}
                                />
                            </div>
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
                <div className="results-container">
                    <div className="content_box">
                        <div className="results-top">Resultats de votre recherche <span>({results.length} projets)</span></div>
                        <div className="results-content">
                            {results.map((element, key) => {
                                return (
                                    <Card
                                        element={element}
                                        setProject={setProject}
                                        setOpenLikersModal={setOpenLikersModal}
                                        setOpenFollowersModal={setOpenFollowersModal}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} />
            </div>

            {openFollowersModal && <FollowersModal project={project} open={openFollowersModal} setOpen={setOpenFollowersModal} websocket={websocket} user={user} />}
            {openLikersModal && <LikersModal project={project} open={openLikersModal} setOpen={setOpenLikersModal} websocket={websocket} user={user} />}
        </>
    )
}

export default Search