import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../../../actions/project.action";
import { useClickOutside } from "../../../tools/functions/useClickOutside";
import { Button, SmallToolsBtn, TextButton } from "../../../tools/components/Button";
import { ClassicInput } from "../../../tools/components/Inputs";
import { FaPen } from 'react-icons/fa'
import { BsInboxFill } from 'react-icons/bs'
import { SmallLoader } from "../../../tools/components/Loader";

const Location = ({ project }) => {
    const [location, setLocation] = useState(project.location);
    const [department, setDepartment] = useState(project.department);
    const [region, setRegion] = useState(project.region);
    const [newRegion, setNewRegion] = useState(project.newRegion);
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const [form, setForm] = useState(false)
    const wrapperRef = useRef()
    const dispatch = useDispatch()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)

    const handleLocation = () => {
        dispatch(updateLocation(project._id, location, department, region, newRegion))
        setForm(false)
    }

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

    return (
        <div className="dashboard-about-content-item">
            <div className="label">Localisation</div>
            {!form ? (
                <div className="content">
                    <div className="title">{project.location + " - " + project.department + ", " + project.region}</div>
                    <SmallToolsBtn onClick={() => setForm(true)}><FaPen /></SmallToolsBtn>
                </div>
            ) : (
                <div className="content-form">
                    <ClassicInput className="title-input" type="search" placeholder="Rechercher une adresse..." defaultValue={project.location} onInput={handleInputChange} onChange={searchLocation} />
                    <div tabIndex="0" className="auto-complete-container custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                        {!isEmpty && display && isResponse && (
                            locationsFound.map((element, key) => {
                                return (
                                    <div className="auto-complete-item"
                                        onClick={() => {
                                            setSelect(`${element.COM_NOM}, ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)
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
                        <TextButton text="Annuler" className="mx-2" onClick={() => setForm(false)} />
                        <Button text="Valider" disabled={location !== project.location} onClick={handleLocation} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Location;