import React, { useState } from "react";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";
import Modal from "../components/Modal";
import { EndIconInput } from "../components/Inputs";
import { BsCaretDownFill } from 'react-icons/bs'

const MapModal = ({ open, setOpen, location, setLocation }) => {
    const [ByDepartments, setDepartments] = useState(false)
    const [isRegionInResult, setRegionsInResult] = useState([])
    const [openRegions, setOpenRegions] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState()
    const isEmpty = !isRegionInResult || isRegionInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');

    const regions = [
        { label: "Alsace" },
        { label: "Aquitaine" },
        { label: "Auvergne" },
        { label: "Basse-Normandie" },
        { label: "Bourgogne" },
        { label: "Bretagne" },
        { label: "Centre" },
        { label: "Champagne-Ardenne" },
        { label: "Corse" },
        { label: "Franche-Comté" },
        { label: "Haute-Normandie" },
        { label: "Île-de-France" },
        { label: "Languedoc-Roussillon" },
        { label: "Limousin" },
        { label: "Lorraine" },
        { label: "Midi-Pyrénées" },
        { label: "Nord-Pas-de-Calais" },
        { label: "Pays de la Loire" },
        { label: "Picardie" },
        { label: "Poitou-Charentes" },
        { label: "Provence-Alpes-Côte d'Azur" },
        { label: "Rhône-Alpes" },
        { label: "Guadeloupe" },
        { label: "Martinique" },
        { label: "Guyane" },
        { label: "La Réunion" },
        { label: "Mayotte" }
    ]

    const handleInputChange = (e) => { setSearchQuery(e.target.value) }

    const searchRegion = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = regions.filter(element => regexp.test(element.label))
            setSearch(true)
            setRegionsInResult(response)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    return (
        <Modal open={open} setOpen={setOpen} css="bg-white dark:bg-background_primary shadow-custom dark:shadow-lg">
            <div className="flex relative w-full mb-4 border-b border-b-slate-300/30">
                <div data-choice="1"
                    className={`h-full w-1/2 text-center text-gray-500 dark:text-slate-300 py-2 border-b-2 border-transparent cursor-pointer hover:text-primary ${!ByDepartments && "text-primary border-primary"}`}
                    onClick={() => setDepartments(false)}
                >Régions</div>
                <div data-choice="2"
                    className={`h-full w-1/2 text-center text-gray-500 dark:text-slate-300 py-2 border-b-2 border-transparent cursor-pointer hover:text-primary ${ByDepartments && "text-primary border-primary"}`}
                    onClick={() => setDepartments(true)}
                >Départements</div>
            </div>
            {!ByDepartments ? (
                <div className="relative">
                    <EndIconInput
                        text="Région"
                        type="text"
                        fullwidth
                        endIcon={<BsCaretDownFill className="h-[18px] w-[18px] text-gray-500" />}
                        onChange={handleInputChange}
                        onInput={searchRegion}
                        onClick={() => setOpenRegions(!openRegions)}
                        defaultValue={location}
                    />
                    {openRegions &&
                        <div className="absolute max-h-[300px] overflow-auto w-full bg-white dark:bg-background_primary_light shadow-custom dark:shadow-lg">
                            {regions.map((element, key) => {
                                return (
                                    <div
                                        className="flex items-center px-4 py-2 text-gray-500 dark:text-slate-300 border-l-2 border-l-transparent hover:border-l-primary hover:bg-slate-100 dark:hover:bg-background_primary_x_light cursor-pointer"
                                        key={key}
                                        onClick={() => { setLocation(element.label); setOpen(false) }}
                                        style={{ display: search ? (isRegionInResult.includes(element) ? "block" : "none") : ("block") }}
                                    >
                                        {element.label}
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <MapRegions />
                </div>
            ) : (
                <div>
                    <EndIconInput
                        text="Département"
                        type="text"
                        fullwidth
                        endIcon={<BsCaretDownFill className="h-[18px] w-[18px] text-gray-500" />}
                    />
                    <MapDepartments />
                </div>
            )}
        </Modal>
    )
}

export default MapModal;