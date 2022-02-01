import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loading-icons'
import { updateLocation } from "../../../../actions/project.action";

const Location = ({ props, id }) => {
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
        dispatch(updateLocation(id, location, department, region, newRegion))
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

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDisplay(false);
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-info">
            {!updateLocationForm ? (
                <>
                    {modified ? (<p>{projectData.location}, {projectData.department}, {projectData.region}</p>) : (<p>{props}</p>)}
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={() => setUpdateLocationForm(!updateLocationForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
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
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={hideLocationUpdater}>Annuler</button>
                        <button className="btn btn-primary" disabled={!value} onClick={handleLocation}>Enregistrer</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Location;