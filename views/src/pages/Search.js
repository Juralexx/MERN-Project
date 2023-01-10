import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../components/tools/hooks/useClickOutside'
import CategoriesPicker from '../components/home/CategoriesPicker'
import LocationsAutocomplete from '../components/home/LocationsAutocomplete'
import { Button, TextButton } from '../components/tools/global/Button'
import Card from '../components/tools/components/Card'
import FollowersModal from '../components/tools/components/FollowersModal'
import { DropdownInput, IconInput } from '../components/tools/global/Inputs'
import LikersModal from '../components/tools/components/LikersModal'
import MapModal from '../components/tools/map/MapModal'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSearch, AiOutlineUnorderedList, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { GiFrance } from 'react-icons/gi'

const Search = ({ websocket, user, search, results, datas, setDatas }) => {
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const [moreFilters, setMoreFilters] = useState(false)
    const [project, setProject] = useState()

    const categoriesRef = useRef()
    const [openCategories, setOpenCategories] = useState(false)
    useClickOutside(categoriesRef, () => setOpenCategories(false))

    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setDatas(data => ({ ...data, recentLocations: JSON.parse(locationsStored) }))
    }, [locationsStored])

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
                                    icon={<AiOutlineSearch />}
                                />
                                <div ref={categoriesRef} className="relative">
                                    <IconInput
                                        className="is_start_icon cursor-pointer"
                                        placeholder="Catégorie"
                                        readOnly
                                        icon={<AiOutlineUnorderedList />}
                                        endIcon={<IoIosArrowDown />}
                                        onClick={() => setOpenCategories(!openCategories)}
                                        onChange={() => setDatas(data => ({ ...data, category: datas.category }))}
                                        value={datas.category}
                                    />
                                    <CategoriesPicker
                                        open={openCategories}
                                        setOpen={setOpenCategories}
                                        setDatas={setDatas}
                                    />
                                </div>
                            </div>
                            <div className="header_input_flex">
                                <IconInput
                                    className="is_start_icon"
                                    placeholder="Métier"
                                    type="text"
                                    icon={<AiOutlineUser />}
                                />
                                <LocationsAutocomplete
                                    datas={datas}
                                    setDatas={setDatas}
                                />
                            </div>
                            {moreFilters &&
                                <div className="header_input_flex">
                                    <DropdownInput
                                        readOnly
                                        placeholder="Date de mise en ligne"
                                        value={datas.date}
                                        cross
                                        onClean={() => setDatas(data => ({ ...data, date: "" }))}
                                    >
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un jour" }))}>Moins d'un jour</div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'une semaine" }))}>Moins d'une semaine</div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un mois" }))}>Moins d'un mois</div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un an" }))}>Moins d'un an</div>
                                    </DropdownInput>
                                    <DropdownInput
                                        readOnly
                                        placeholder="État"
                                        value={datas.state}
                                        cross
                                        onClean={() => setDatas(data => ({ ...data, state: "" }))}
                                    >
                                        <div onClick={() => setDatas(data => ({ ...data, state: "En préparation" }))}>En préparation</div>
                                        <div onClick={() => setDatas(data => ({ ...data, state: "En cours" }))}>En cours</div>
                                        <div onClick={() => setDatas(data => ({ ...data, state: "Terminé" }))}>Terminé</div>
                                    </DropdownInput>
                                </div>
                            }
                            <div className="btn_container">
                                <div className="flex">
                                    <TextButton className="btn_icon_start mr-2" onClick={() => setOpenMapModal(true)}>
                                        <GiFrance />Voir la carte
                                    </TextButton>
                                    <TextButton className="btn_icon_start" onClick={() => setMoreFilters(!moreFilters)}>
                                        {!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />}{!moreFilters ? "Plus de filtres" : "Moins de filtres"}
                                    </TextButton>
                                </div>
                                <Button className="px-7" onClick={search}>
                                    Rechercher<MdOutlineDoubleArrow />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="results-container">
                    <div className="content_box">
                        <div className="results-top">
                            Resultats de votre recherche <span>({results.length} projets)</span>
                        </div>
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
                <MapModal
                    open={openMapModal}
                    setOpen={setOpenMapModal}
                    datas={datas}
                    setDatas={setDatas}
                />
            </div>

            {openFollowersModal &&
                <FollowersModal
                    project={project}
                    open={openFollowersModal}
                    setOpen={setOpenFollowersModal}
                    websocket={websocket}
                    user={user}
                />
            }
            {openLikersModal &&
                <LikersModal
                    project={project}
                    open={openLikersModal}
                    setOpen={setOpenLikersModal}
                    websocket={websocket}
                    user={user}
                />
            }
        </>
    )
}

export default Search