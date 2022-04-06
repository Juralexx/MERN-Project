import React, { useRef, useState } from "react";
import axios from "axios";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { ClassicInput } from "../../../tools/components/Inputs";
import { BsInboxFill } from 'react-icons/bs'
import { SmallLoader } from "../../../tools/components/Loader";
import { ErrorCard } from "../../../tools/components/Error";

const Location = ({ location, setLocation, department, setDepartment, region, setRegion, newRegion, setNewRegion, isErr, error }) => {
    const [searchQuery, setSearchQuery] = useState(location)
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    const errorRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)
    const checkErr = (name) => { if (isErr === name) return "err" }

    const setSelect = (value) => { setSearchQuery(value); setDisplay(false); setLoading(false) }
    const handleInputChange = (e) => { setSearchQuery(e.target.value); setLocation(searchQuery) }

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                setLocationsFound(response.data)
                if (searchQuery.length > 2) {
                    setResponse(true)
                    setDisplay(true)
                    setLoading(true)
                    if (isEmpty) {
                        setResponse(false)
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    const clean = () => {
        setSearchQuery("")
        setLocation("")
        setDepartment("")
        setRegion("")
        setNewRegion("")
    }

    return (
        <div className="content-form">
            <p className="title full">Localité <span>Champ requis</span></p>
            <ClassicInput className={`full ${checkErr("location")}`} type="text" placeholder="Rechercher une adresse..." value={searchQuery} onInput={handleInputChange} onChange={searchLocation} cross onClean={clean} />
            {isErr === "location" && <ErrorCard useRef={errorRef} display={isErr === "location"} text={error} />}

            <div tabIndex="0" className="auto-complete-container custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                {!isEmpty && display && isResponse && (
                    locationsFound.map((element, key) => {
                        return (
                            <div className="auto-complete-item"
                                onClick={() => {
                                    setSelect(`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)
                                    setLocation(element.COM_NOM)
                                    setDepartment(element.DEP_NOM_NUM)
                                    setRegion(element.REG_NOM_OLD)
                                    setNewRegion(element.REG_NOM)
                                }} key={key}>{`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                            </div>
                        )
                    })
                )}
                {isLoading && isEmpty && (
                    <SmallLoader />
                )}
                {searchQuery.length > 2 && isEmpty && !isLoading && (
                    <div className="no-result">
                        <div><BsInboxFill /></div>
                        <div>Aucun resultat ne correspond à votre recherche...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Location