import React, { useEffect, useRef, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'
import { IoAlbums, IoSend } from 'react-icons/io5'
import CategoriesPicker from '../components/home/CategoriesPicker'
import LocationsAutocomplete from '../components/home/LocationsAutocomplete'
import { EndIconButton, TextButton } from '../components/tools/components/Button'
import Card from '../components/tools/components/Card'
import FollowersModal from '../components/tools/components/FollowersModal'
import { IconInput } from '../components/tools/components/Inputs'
import LikersModal from '../components/tools/components/LikersModal'
import { useClickOutside } from '../components/tools/functions/useClickOutside'
import MapModal from '../components/tools/map/MapModal'

const Search = ({ websocket, projects, user, search, results, setResults, category, setCategory, location, setLocation, recentLocations, setRecentLocations, aroundLocation, setAroundLocation }) => {
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [project, setProject] = useState()

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
        <>
            <div className="search-page">
                <div className="search-header">
                    <div className="content-box">
                        <div className="header-input-flex">
                            <IconInput
                                className="is-start-icon"
                                placeholder="Rechercher un projet"
                                type="search"
                                icon={<BiSearchAlt />}
                            />
                            <div ref={categoriesRef} className="relative">
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
                        </div>
                        <div className="header-input-flex">
                            <IconInput
                                className="is-start-icon"
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
                        <div className="btn-container">
                            <TextButton text="Voir la carte" onClick={() => setOpenMapModal(true)} />
                            <EndIconButton className="px-7" text="Rechercher" icon={<IoSend />} onClick={search} />
                        </div>
                    </div>
                </div>
                <div className="results-container">
                    <div className="content-box">
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