import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../components/tools/hooks/useClickOutside'
import CategoriesPicker from '../components/home/CategoriesPicker'
import LocationsAutocomplete from '../components/home/LocationsAutocomplete'
import { Button, IconToggle, TextButton } from '../components/tools/global/Button'
import Card from '../components/tools/components/Card'
import FollowersModal from '../components/tools/components/FollowersModal'
import { DropdownInput, IconInput } from '../components/tools/global/Inputs'
import LikersModal from '../components/tools/components/LikersModal'
import MapModal from '../components/tools/map/MapModal'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSearch, AiOutlineUnorderedList, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { GiFrance } from 'react-icons/gi'

const Search = ({ websocket, user, search, results, datas, setDatas, sortedProjects }) => {
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
                <div className="search-header py-8">
                    <div className="container col-lg-8 mx-auto">
                        <IconInput
                            className="is_start_icon mb-3"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<AiOutlineSearch />}
                            defaultValue={datas.query}
                            onChange={e => setDatas(data => ({ ...data, query: e.target.value }))}
                        />
                        <div className="row relative mb-3">
                            <div className="col-12 col-sm-6 sm:!pr-1 sm:pb-0 pb-3" ref={categoriesRef}>
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
                            <div className="col-12 col-sm-6 sm:!pl-1">
                                <IconInput
                                    className="is_start_icon"
                                    placeholder="Métier"
                                    type="text"
                                    icon={<AiOutlineUser />}
                                    defaultValue=""
                                    onChange={e => setDatas(data => ({ ...data, skills: e.target.value }))}
                                />
                            </div>
                        </div>
                        <LocationsAutocomplete
                            datas={datas}
                            setDatas={setDatas}
                        />
                        {moreFilters &&
                            <div className="row !my-3">
                                <div className="col-6 !pr-1">
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
                                </div>
                                <div className="col-6 !pl-1">
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
                            </div>
                        }
                        <div className={`btn-container flex justify-between items-center ${!moreFilters ? 'pt-3' : 'pt-0'}`}>
                            <div className="hidden sm:flex">
                                <TextButton className="btn_icon_start primary mr-2" onClick={() => setOpenMapModal(true)}>
                                    <GiFrance />Voir la carte
                                </TextButton>
                                <TextButton className="btn_icon_start" onClick={() => setMoreFilters(!moreFilters)}>
                                    {!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />}{!moreFilters ? "Plus de filtres" : "Moins de filtres"}
                                </TextButton>
                            </div>
                            <div className="flex sm:hidden">
                                <IconToggle className="primary mr-2" icon={<GiFrance />} onClick={() => setOpenMapModal(true)} />
                                <IconToggle className="primary mr-4" icon={!moreFilters ? <AiOutlinePlus /> : <AiOutlineMinus />} onClick={() => setMoreFilters(!moreFilters)} />
                            </div>
                            <Button className="btn_icon_end" onClick={search}>
                                Rechercher<MdOutlineDoubleArrow />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="search-results_container container-lg">
                    {results.length > 0 &&
                        <div className="search-results_top">
                            Resultats de votre recherche <span>({results.length} projets)</span>
                        </div>
                    }
                    <div className="search-results_content">
                        {results.length > 0 ? (
                            <div className="search-results_projects">
                                {results.map((element, key) => {
                                    return (
                                        <div key={key}>
                                            <Card
                                                element={element}
                                                setProject={setProject}
                                                setOpenLikersModal={setOpenLikersModal}
                                                setOpenFollowersModal={setOpenFollowersModal}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="search-no-results">
                                <img src="/img/search.png" alt="Aucun resultat ne correspond à votre recherche" />
                                <div className='font-medium'>
                                    Aucun resultat ne correspond à votre recherche.<br />
                                    <span className='font-thin'>Nous vous invitons à modifier vos critères de recherche.</span>
                                </div>
                            </div>
                        )}
                        {results.length < 12 &&
                            <>
                                <div className="search-results_top mt-5">
                                    <h3>Explorer plus de projets</h3>
                                </div>
                                <div className="search-results_projects">
                                    {sortedProjects.randomized.map((element, key) => {
                                        return (
                                            <div key={key}>
                                                <Card
                                                    element={element}
                                                    setProject={setProject}
                                                    setOpenLikersModal={setOpenLikersModal}
                                                    setOpenFollowersModal={setOpenFollowersModal}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
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