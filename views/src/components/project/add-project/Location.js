import React, { useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loading-icons'

const Location = ({ setLocation, setDepartment, setRegion, setNewRegion }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0

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
        <div className="auto-container add-title-location-bloc add-project-bloc">
            <h3>Où votre projet se situe-t-il ?</h3>
            <label htmlFor="title"><span>Localité</span><small>Champ requis</small></label>
            <input placeholder="Rechercher mon adresse" value={searchQuery} onInput={handleInputChange} onChange={searchLocation} type="search" />
            {!isEmpty && display && isResponse && (
                <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                    {locationsFound.map((element, key) => {
                        const adress = `${element.COM_NOM}, ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`;

                        return (
                            <li onClick={(e) => {
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
    )
}

export default Location