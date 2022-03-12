import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loading-icons'
import { updateLocation } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { Button, RoundedButton } from "../../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../../tools/components/Inputs";

const Location = ({ project }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [region, setRegion] = useState("");
    const [newRegion, setNewRegion] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const [updateLocationForm, setUpdateLocationForm] = useState(false)
    const wrapperRef = useRef()
    const dispatch = useDispatch()
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)

    const hideLocationUpdater = () => { setUpdateLocationForm(false) }

    const handleLocation = () => {
        dispatch(updateLocation(project._id, location, department, region, newRegion))
        setUpdateLocationForm(false)
        setModified(true)
    }

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
        setValue(!value)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
        setLocation(searchQuery)
    }

    const prepareSearchQuery = (query) => {
        const url = `${process.env.REACT_APP_API_URL}api/location/${query}`
        return encodeURI(url)
    }

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const URL = prepareSearchQuery(searchQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchQuery.length >= 2) {
                setLocationsFound(response.data)
                setDisplay(true)
                setResponse(true)
                if (locationsFound.length === 0) {
                    setResponse(false)
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    }

    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)

    return (
        <div className="relative flex items-center justify-between w-full py-5 px-7 border-b border-slate-500 dark:border-slate-300" ref={wrapperRef}>
            {!updateLocationForm ? (
                <>
                    {modified ? (
                        <p>{projectData.location}, {projectData.department}, {projectData.region}</p>
                    ) : (
                        <p>{project.location + " - " + project.department + " - " + project.region}</p>
                    )}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateLocationForm(!updateLocationForm)}>Modifier</RoundedButton>
                </>
            ) : (
                <>
                    <div>
                        <BasicInput placeholder="Rechercher mon adresse" value={searchQuery} onInput={handleInputChange} onChange={searchLocation} type="search" />
                        {!isEmpty && display && isResponse && (
                            <ul tabIndex="0" className="absolute max-h-[300px] overflow-auto w-full bg-white dark:bg-background_primary_light shadow-custom dark:shadow-lg" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                                {locationsFound.map((element, key) => {
                                    const adress = `${element.COM_NOM}, ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`;
                                    return (
                                        <li 
                                        className="flex items-center px-4 py-2 text-gray-500 dark:text-slate-300 border-l-2 border-l-transparent hover:border-l-primary hover:bg-slate-100 dark:hover:bg-background_primary_x_light cursor-pointer"
                                        onClick={(e) => {
                                            setSelect(adress)
                                            setLocation(element.COM_NOM)
                                            setDepartment(element.DEP_NOM_NUM)
                                            setRegion(element.REG_NOM_OLD)
                                            setNewRegion(element.REG_NOM)
                                        }} key={key}>{adress}</li>
                                    )
                                })}
                            </ul>
                        )}
                        {isLoading && !display && (
                            <div className="load-container">
                                <ThreeDots />
                            </div>
                        )}
                        {!isResponse && !isLoading && (
                            <div className="load-container">
                                <p>Aucun resultat ne correspond à votre recherche</p>
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        <Button text="Annuler" onClick={hideLocationUpdater}>Annuler</Button>
                        <Button text="Valider" disabled={!value} onClick={handleLocation}>Enregistrer</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Location;