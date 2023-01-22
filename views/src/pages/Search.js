import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useClickOutside } from '../components/tools/hooks/useClickOutside'
import { departments, regions } from '../api/regions'
import Icon from '../components/tools/icons/Icon'
import MapModal from '../components/tools/map/MapModal'
import LocationsAutocomplete from '../components/home/LocationsAutocomplete'
import CategoriesPicker from '../components/home/CategoriesPicker'
import Card from '../components/tools/components/Card'
import CardLoading from '../components/tools/components/CardLoading'
import { Button, IconToggle, TextButton } from '../components/tools/global/Button'
import { DropdownInput, IconInput } from '../components/tools/global/Inputs'
import { addClass, divideArrayIntoSizedParts, reverseArray } from '../components/Utils'

const Search = ({ websocket, user, search, datas, setDatas, sortedProjects }) => {
    const categoriesRef = useRef()
    const [openCategories, setOpenCategories] = useState(false)
    useClickOutside(categoriesRef, () => setOpenCategories(false))

    const [openMapModal, setOpenMapModal] = useState(false)
    const [moreFilters, setMoreFilters] = useState(false)

    /**
     * 
     */

    const [results, setResults] = useState({ all: [], paginatedResults: [], isLoading: true })

    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    let currentPage = Number(searchParams.get('p')) || 1

    useEffect(() => {
        if (currentPage !== 1) {
            if (currentPage > results.paginatedResults.length + 1)
                window.location.href = `${window.location.origin}/`
        }
    }, [currentPage, results])

    /**
     * 
     */

    useEffect(() => {
        if (searchParams) {
            let origin = searchParams.get('origin')

            let prevUrl = localStorage.getItem('prevUrl')

            if (prevUrl !== '/') {
                searchParams.delete('origin')
                setSearchParams(searchParams)
            }

            if (!origin) {
                setDatas(prevState => ({ ...prevState, location: [] }))

                let locationParam = searchParams.get('location')
                let departmentParam = searchParams.get('department')
                let regionParam = searchParams.get('region')

                if (locationParam && locationParam.length > 0) {
                    locationParam.split('/').map(async loc => {
                        return await axios
                            .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/city/${loc}`))
                            .then(res => {
                                setDatas(prevState => ({
                                    ...prevState,
                                    location: [...prevState.location, {
                                        type: "city",
                                        location: res.data.COM_NOM,
                                        department: res.data.DEP_NOM,
                                        department_code: res.data.DEP_CODE,
                                        region: res.data.REG_NOM_OLD,
                                        code_region: res.data.REG_CODE_OLD,
                                        new_region: res.data.REG_NOM,
                                        new_region_code: res.data.REG_CODE
                                    }]
                                }))
                            })
                            .catch(err => console.log("Error: ", err))
                    })
                }
                if (departmentParam && departmentParam.length > 0) {
                    departmentParam.split('/').map(loc => {
                        const dep = departments.find(d => d.nom_departement === loc)
                        return setDatas(prevState => ({
                            ...prevState,
                            location: [...prevState.location, {
                                type: "department",
                                department: dep.nom_departement,
                                department_code: dep.code_departement,
                                new_region: dep.nom_nouvelle_region,
                                new_region_code: dep.code_nouvelle_region,
                                region: dep.nom_ancienne_region,
                                region_code: dep.code_ancienne_region
                            }]
                        }))
                    })
                }
                if (regionParam && regionParam.length > 0) {
                    regionParam.split('/').map(loc => {
                        const reg = regions.find(d => d.nom_region === loc)
                        return setDatas(prevState => ({
                            ...prevState,
                            location: [...prevState.location, {
                                type: "region",
                                region: reg.nom_region,
                                region_code: reg.code_region,
                                new_region: reg.nom_nouvelle_region,
                                new_region_code: reg.code_nouvelle_region
                            }]
                        }))
                    })
                }
            }

            setDatas(prevState => ({
                ...prevState,
                query: searchParams.get('q') || '',
                category: searchParams.get('category') || '',
                aroundLocation: searchParams.get('aroundLocation') || 0,
                skills: searchParams.get('skills') || '',
                date: searchParams.get('date') || '',
                state: searchParams.get('state') || '',
            }))

            setResults({
                all: sortedProjects.randomized,
                paginatedResults: divideArrayIntoSizedParts(sortedProjects.randomized, 20),
                isLoading: false
            })
        }

        if (pathname) {
            switch (pathname) {
                case '/all':
                    console.log('all')
                    setResults({
                        all: sortedProjects.randomized,
                        paginatedResults: divideArrayIntoSizedParts(sortedProjects.randomized, 20),
                        isLoading: false
                    })
                    break;
                case '/recents':
                    console.log('recents')
                    setResults({
                        all: sortedProjects.byDates,
                        paginatedResults: divideArrayIntoSizedParts(sortedProjects.byDates, 20),
                        isLoading: false
                    })
                    break;
                case '/liked':
                    setResults({
                        all: sortedProjects.byLikes,
                        paginatedResults: divideArrayIntoSizedParts(sortedProjects.byLikes, 20),
                        isLoading: false
                    })
                    break;
                case '/followed':
                    setResults({
                        all: sortedProjects.byFollowings,
                        paginatedResults: divideArrayIntoSizedParts(sortedProjects.byFollowings, 20),
                        isLoading: false
                    })
                    break;
                default:
                    break;
            }
        }
    }, [searchParams, pathname, departments, regions])

    /**
     * 
     */

    return (
        <>
            <div className="search-page">
                <div className="search-header py-8">
                    <div className="search-header-container">
                        <IconInput
                            className="is_start_icon mb-3"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<Icon name="Search" />}
                            value={datas.query}
                            onChange={e => setDatas(data => ({ ...data, query: e.target.value }))}
                        />
                        <div className="row relative mb-3">
                            <div className="col-12 col-sm-6 sm:!pr-1 sm:pb-0 pb-3" ref={categoriesRef}>
                                <IconInput
                                    className="is_start_icon cursor-pointer"
                                    placeholder="Catégorie"
                                    readOnly
                                    icon={<Icon name="List" />}
                                    endIcon={<Icon name="CaretDown" />}
                                    onClick={() => setOpenCategories(!openCategories)}
                                    value={datas.category}
                                    onChange={() => setDatas(data => ({ ...data, category: datas.category }))}
                                    cross
                                    onClean={() => setDatas(data => ({ ...data, category: '' }))}
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
                                    icon={<Icon name="User" />}
                                    value={datas.skills}
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
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un jour" }))}>
                                            Moins d'un jour
                                        </div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'une semaine" }))}>
                                            Moins d'une semaine
                                        </div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un mois" }))}>
                                            Moins d'un mois
                                        </div>
                                        <div onClick={() => setDatas(data => ({ ...data, date: "Moins d'un an" }))}>
                                            Moins d'un an
                                        </div>
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
                                        <div onClick={() => setDatas(data => ({ ...data, state: "En préparation" }))}>
                                            En préparation
                                        </div>
                                        <div onClick={() => setDatas(data => ({ ...data, state: "En cours" }))}>
                                            En cours
                                        </div>
                                        <div onClick={() => setDatas(data => ({ ...data, state: "Terminé" }))}>
                                            Terminé
                                        </div>
                                    </DropdownInput>
                                </div>
                            </div>
                        }
                        <div className={`btn-container flex justify-between items-center ${!moreFilters ? 'pt-3' : 'pt-0'}`}>
                            <div className="hidden sm:flex">
                                <TextButton className="btn_icon_start primary mr-2" onClick={() => setOpenMapModal(true)}>
                                    <Icon name="France" />Voir la carte
                                </TextButton>
                                <TextButton className="btn_icon_start" onClick={() => setMoreFilters(!moreFilters)}>
                                    {!moreFilters ? <Icon name="Plus" /> : <Icon name="Minus" />}
                                    {!moreFilters ? "Plus de filtres" : "Moins de filtres"}
                                </TextButton>
                            </div>
                            <div className="flex sm:hidden">
                                <IconToggle
                                    className="primary mr-2"
                                    icon={<Icon name="France" />}
                                    onClick={() => setOpenMapModal(true)}
                                />
                                <IconToggle
                                    className="primary mr-4"
                                    icon={!moreFilters ? <Icon name="Plus" /> : <Icon name="Minus" />}
                                    onClick={() => setMoreFilters(!moreFilters)}
                                />
                            </div>
                            <Button className="btn_icon_end" onClick={search}>
                                Rechercher <Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="search-results_container container-lg">
                    {!results.isLoading ? (
                        results.all.length > 0 &&
                        <div className="search-results_top">
                            Résultats de votre recherche <span>({results.all.length} projets)</span>
                        </div>
                    ) : (
                        <div className="search-results_top">
                            <div className='flex'>
                                <div className="animate-pulse bg-slate-400 h-7 w-[100px] rounded-full mr-3"></div>
                                <div className="animate-pulse bg-slate-400 h-7 w-[70px] rounded-full mr-3"></div>
                                <div className="animate-pulse bg-slate-400 h-7 w-[150px] rounded-full"></div>
                            </div>
                        </div>
                    )}
                    <div className="search-results_content">
                        {!results.isLoading ? (
                            results.all.length > 0 ? (
                                <>
                                    <div className="search-results_projects">
                                        {results.paginatedResults[currentPage - 1].map((element, key) => {
                                            return (
                                                <Card
                                                    key={key}
                                                    project={element}
                                                    user={user}
                                                    websocket={websocket}
                                                />
                                            )
                                        })}
                                    </div>
                                    <div className='pagination-container !pt-[70px]'>
                                        <div className="pagination">
                                            {currentPage - 1 > 0 &&
                                                <>
                                                    <Link to={`/researches`} className='arrow'>
                                                        <Icon name="DoubleArrowLeft" />
                                                    </Link>
                                                    <Link to={`/researches/?p=${currentPage - 1}`} className='arrow'>
                                                        <Icon name="CaretLeft" />
                                                    </Link>
                                                </>
                                            }
                                            {[...new Array(results.paginatedResults.length)].map((_, key) => {
                                                return (
                                                    <Link to={`/researches/?p=${key + 1}`}
                                                        key={key}
                                                        className={`${addClass(currentPage > (key + 3) || currentPage < (key - 1), 'hidden')} ${addClass(currentPage === (key + 1), 'active')}`}
                                                    >
                                                        {key + 1}
                                                    </Link>
                                                )
                                            })}
                                            {currentPage + 1 <= results.paginatedResults.length &&
                                                <>
                                                    <Link to={`/researches/?p=${currentPage + 1}`} className='arrow'>
                                                        <Icon name="CaretRight" />
                                                    </Link>
                                                    <Link to={`/researches/?p=${results.paginatedResults.length}`} className='arrow'>
                                                        <Icon name="DoubleArrowRight" />
                                                    </Link>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="search-no-results">
                                    <img src="/img/search.png" alt="Aucun résultat ne correspond à votre recherche" />
                                    <div className='font-medium'>
                                        Aucun résultat ne correspond à votre recherche.<br />
                                        <span className='font-thin'>Nous vous invitons à modifier vos critères de recherche.</span>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="search-results_projects">
                                {[...Array(12)].map((_, key) => {
                                    return (
                                        <CardLoading key={key} />
                                    )
                                })}
                            </div>
                        )}
                        {results.all.length < 12 &&
                            <>
                                <div className="search-results_top mt-10">
                                    <h3>Explorer plus de projets</h3>
                                </div>
                                <div className="search-results_projects">
                                    {sortedProjects.randomized.map((element, key) => {
                                        return (
                                            <div key={key}>
                                                <Card
                                                    project={element}
                                                    user={user}
                                                    websocket={websocket}
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
        </>
    )
}

export default Search