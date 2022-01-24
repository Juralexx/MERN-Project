import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loading-icons'

const Work = () => {

    const api = `${process.env.REACT_APP_API_URL}api/work/`;
    const [work, setWork] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [worksFound, setWorksFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !worksFound || worksFound.length === 0

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
        setWork(searchQuery)
    }

    const prepareSearchQuery = (query) => {
        const url = `${api}${query}`
        return encodeURI(url)
    }

    const searchWork = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const URL = prepareSearchQuery(searchQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchQuery.length >= 2) {
                console.log(response)
                setWorksFound(response.data)
                setDisplay(true)
                setResponse(true)
                if (worksFound.length === 0) {
                    setResponse(false)
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <div className="auto-container add-work-bloc add-project-bloc">
            <h3>De qui avez vous besoin ?</h3>
            <label htmlFor="title"><span>Métier</span><small>Champ requis</small></label>
            <input placeholder="Rechercher mon adresse" value={searchQuery} onInput={handleInputChange} onChange={searchWork} type="search" />
            {!isEmpty && display && isResponse && (
                <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                    {worksFound.map(( element ) => {
                        const choice = `${element.appelation_metier}`;
                        return (
                            <li onClick={() => { setSelect(choice); setWork(choice) }} key={element._id}>{choice}</li>
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

export default Work;