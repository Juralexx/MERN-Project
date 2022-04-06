import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ClassicInput } from '../../tools/components/Inputs';
import { useClickOutside } from '../../tools/functions/useClickOutside';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { EndIconButton, StartIconButton } from '../../tools/components/Button';
import { SmallLoader } from '../../tools/components/Loader';
import { BsInboxFill } from 'react-icons/bs';
import { ErrorCard } from '../../tools/components/Error';

const Location = ({ location, setLocation, department, setDepartment, region, setRegion, newRegion, setNewRegion, onNext, onBack, setErr, setError, isErr, error }) => {
    const [searchQuery, setSearchQuery] = useState("")
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
                setLoading(true)
                if (searchQuery.length > 2) {
                    setResponse(true)
                    setDisplay(true)
                    if (isEmpty) {
                        setResponse(false)
                        setLoading(false)
                        setDisplay(false)
                    }
                } else { setDisplay(false) }
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

    const checkValues = () => {
        if (location.length <= 0 || department.length <= 0 || region.length <= 0 || newRegion.length <= 0) {
            setErr("location")
            setError("Veuillez sélectionner une localité...")
            console.log(isErr)
        } else {
            setErr(null)
            onNext()
        }
    }

    return (
        <div className="add-project-card">
            <h2 className="mb-5">Où votre projet se situe-t-il ?</h2>
            <div className="content-form">
                <p className="title">Localité</p>
                <ClassicInput className={`small-input ${checkErr("location")}`} type="text" placeholder="Rechercher une adresse..." value={searchQuery} onInput={handleInputChange} onChange={searchLocation} cross onClean={clean} />
                {isErr === "location" && <ErrorCard useRef={errorRef} display={isErr === "location"} text={error} />}
            </div>
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
                {(isLoading || (!isEmpty && !display && isLoading)) && (
                    <SmallLoader />
                )}
                {!isResponse && !isLoading && searchQuery.length > 2 && isEmpty && (
                    <div className="no-result">
                        <div><BsInboxFill /></div>
                        <div>Aucun resultat ne correspond à votre recherche...</div>
                    </div>
                )}
            </div>
            <div className="btn-container">
                <StartIconButton text="Retour" className="previous-btn" icon={<IoMdArrowRoundBack />} onClick={onBack} />
                <EndIconButton text="Suivant" className="next-btn" icon={<IoMdArrowRoundForward />} onClick={checkValues} disabled={location.length <= 0 || department.length <= 0 || region.length <= 0 || newRegion.length <= 0} />
            </div>
        </div>
    )
}

export default Location