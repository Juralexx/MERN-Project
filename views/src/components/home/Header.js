import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import MapModal from '../tools/map/MapModal';
import LocationsAutocomplete from './LocationsAutocomplete';
import CategoriesPicker from './CategoriesPicker';
import { IconToggle, Button, TextButton } from '../tools/global/Button';
import { DropdownInput, IconInput } from '../tools/global/Inputs';
import { GiFrance } from 'react-icons/gi';
import Icon from '../tools/icons/Icon';

const Header = ({ user, search, datas, setDatas }) => {
    const [openCategories, setOpenCategories] = useState(false)
    const categoriesRef = useRef()
    useClickOutside(categoriesRef, () => setOpenCategories(false))

    const [moreFilters, setMoreFilters] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const locationsStored = localStorage.getItem("search:locations")

    useEffect(() => {
        if (locationsStored && JSON.parse(locationsStored).length > 0)
            setDatas(data => ({ ...data, recentLocations: JSON.parse(locationsStored) }))
    }, [locationsStored])

    return (
        <div id="header">
            <div className="container py-8">
                <div className="header_container row">
                    <div className="col-12 col-lg-6 lg:pr-5 pb-7 lg:pb-0">
                        <h1><span>Donner vie</span><br />aux bonnes idées</h1>
                        <p>Circa hos dies Lollianus primae lanuginis adulesce, lampadi filius ex praefecto, exploratius causam Maximino spectante.</p>
                        <Button className="btn_icon_start">
                            <Link to="/add-project">
                                <Icon name="Plus" />Déposer un projet
                            </Link>
                        </Button>
                    </div>
                    <div className="col-12 col-lg-6 pt-5 lg:pt-0 lg:pl-5 relative flex flex-col justify-center">
                        <IconInput
                            className="is_start_icon mb-3"
                            placeholder="Rechercher un projet"
                            type="search"
                            icon={<Icon name="Search" />}
                            defaultValue=""
                            onChange={e => setDatas(data => ({ ...data, query: e.target.value }))}
                        />
                        <div className="relative row my-3">
                            <div className="col-12 col-sm-6 sm:!pr-1 sm:pb-0 pb-3" ref={categoriesRef}>
                                <IconInput
                                    className="is_start_icon"
                                    inputClassName="cursor-pointer"
                                    placeholder="Catégorie"
                                    readOnly
                                    icon={<Icon name="List" />}
                                    endIcon={<Icon name="CaretDown" />}
                                    onClick={() => setOpenCategories(!openCategories)}
                                    value={datas.category}
                                    onChange={() => setDatas(data => ({ ...data, category: datas.category }))}
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
                                    type="search"
                                    icon={<Icon name="User" />}
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
                                    {!moreFilters ? <Icon name="Plus" /> : <Icon name="Minus" />}{!moreFilters ? "Plus de filtres" : "Moins de filtres"}
                                </TextButton>
                            </div>
                            <div className="flex sm:hidden">
                                <IconToggle className="primary mr-2" icon={<GiFrance />} onClick={() => setOpenMapModal(true)} />
                                <IconToggle className="primary mr-4" icon={!moreFilters ? <Icon name="Plus" /> : <Icon name="Minus" />} onClick={() => setMoreFilters(!moreFilters)} />
                            </div>
                            <Button className="btn_icon_end" onClick={search}>
                                Rechercher<Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
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
    )
}

export default Header