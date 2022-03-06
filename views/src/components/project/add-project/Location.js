import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loading-icons'
import { Input, BasicInput } from '../../tools/components/Inputs';
import { useClickOutside } from '../../tools/functions/useClickOutside';

const Location = ({ setLocation, setDepartment, setRegion, setNewRegion }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
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
                setLoading(false)
                if (locationsFound.length === 0) {
                    setResponse(false)
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-xl text-gray-500 dark:text-slate-300">
            <h3 className="mb-5">Où votre projet se situe-t-il ?</h3>
            <div className="relative w-full">
                <p className="mb-2">Localité</p>
                <BasicInput
                    type="search"
                    placeholder="Rechercher mon adresse"
                    value={searchQuery}
                    onInput={handleInputChange}
                    onChange={searchLocation}
                    fullwidth
                />
                {!isEmpty && display && isResponse && (
                    <div
                        ref={wrapperRef}
                        tabIndex="0"
                        style={{ display: searchQuery.length < 3 ? "none" : "block" }}
                        className="absolute max-h-[300px] overflow-auto w-full bg-white dark:bg-background_primary_light shadow-xl"
                    >
                        {locationsFound.map((element, key) => {
                            const adress = `${element.COM_NOM}, ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`;

                            return (
                                <div
                                    className="flex items-center px-4 py-2 text-gray-500 dark:text-slate-300 border-l-2 border-l-transparent hover:border-l-primary hover:bg-slate-100 dark:hover:bg-background_primary_x_light cursor-pointer"
                                    onClick={(e) => {
                                        setSelect(adress)
                                        setLocation(element.COM_NOM)
                                        setDepartment(element.DEP_NOM_NUM)
                                        setRegion(element.REG_NOM_OLD)
                                        setNewRegion(element.REG_NOM)
                                    }}
                                    key={key}
                                >{adress}</div>
                            )
                        })}
                    </div>
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
        </div>
    )
}

export default Location