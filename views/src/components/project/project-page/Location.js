import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { ThreeDots } from 'react-loading-icons'
// import { deleteBio } from "../../../../../actions/user.action.delete";
// import Swal from "sweetalert2";
import { updateLocation } from "../../../actions/project.action";

const Location = ({ props, id }) => {
    const startOfReqUrl = 'https://api-adresse.data.gouv.fr/search/?q=';
    const endOfReqUrl = '&type=municipality&limit=5&autocomplete=1';
    const [location, setLocation] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const [updateLocationForm, setUpdateLocationForm] = useState(false)
    const wrapperRef = useRef()
    const dispatch = useDispatch()
    const [value, setValue] = React.useState("");

    const hideLocationUpdater = () => { setUpdateLocationForm(false) }

    const handleLocation = () => {
        dispatch(updateLocation(id, location))
        setUpdateLocationForm(false)
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
        const url = `${startOfReqUrl}${query}${endOfReqUrl}`
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
                console.log(response.data)
                setLocationsFound(response.data.features)
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
                    <p>{props}</p>
                    <div className="btn-container">
                        {/* <button className="btn btn-primary" onClick={handleBioDelete}>Supprimer</button> */}
                        <button className="btn btn-primary" onClick={() => setUpdateLocationForm(!updateLocationForm)}>Modifier</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <input placeholder="Rechercher mon adresse" value={searchQuery} onInput={handleInputChange} onChange={searchLocation} type="search" />
                        {!isEmpty && display && isResponse && (
                            <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                                {locationsFound.map(({ properties }) => {
                                    const town = `${properties.city}`;
                                    const zipcode = `${properties.postcode}`;
                                    const adress = `${town} (${zipcode})`;
                                    return (
                                        <li onClick={(e) => { setSelect(adress); setLocation(adress) }} key={properties.id}>{adress}</li>
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