import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDebounce } from "../../../../tools/Deboucing";
import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../../../../../actions/user.action";
import { deleteLocation } from "../../../../../actions/user.action.delete";
import Swal from "sweetalert2";
import { ThreeDots } from 'react-loading-icons'
import { AiFillHome } from 'react-icons/ai'
import { useClickOutside } from "../views/src/components/tools/functions/useClickOutside";

const LocationUpdater = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const startOfReqUrl = 'https://api-adresse.data.gouv.fr/search/?q=';
    const endOfReqUrl = '&type=municipality&limit=5&autocomplete=1';
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const wrapperRef = useRef();

    const [location, setLocation] = useState("");
    const [locationUpdater, setLocationUpdater] = useState(false);

    const handleLocation = (e) => {
        dispatch(updateLocation(userData._id, location))
        setLocationUpdater(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vos modifications ont été enregistrées !',
            showConfirmButton: false,
            timer: 1300
        })
        setIsSelected(false)
        setDisplay(false)
        setLoading(false)
        console.log(location)
    }

    const handleLocationDelete = () => {
        Swal.fire({
            title: "Etes-vous sur de vouloir supprimer votre adresse ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteLocation(userData._id, location))

                Swal.fire({
                    icon: 'success',
                    title: 'Votre adresse a bien été supprimée !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const isEmpty = !locationsFound || locationsFound.length === 0

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

    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)

    const setSelect = (e) => {
        setSearchQuery(e)
        setIsSelected(true)
        setDisplay(false)
        setLoading(false)
    }

    const closeSelection = () => {
        setLocationUpdater(false)
        setSearchQuery("")
        setIsSelected(false)
        setDisplay(false)
        setLoading(false);
    }

    useDebounce(searchQuery, 1500, searchLocation)

    const openLocationUpdater = () => {
        return (
            <div className="auto-container" ref={wrapperRef}>
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
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={closeSelection}>Annuler</button>
                    <button className="btn btn-primary" disabled={!isSelected} onClick={() => { handleLocation(); setLocation(searchQuery) }}>Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {(userData.location === '' || userData.location === null || userData.location === undefined ) ? (
                <>
                    <div className="user-info">
                        <button className="add-btn" onClick={() => setLocationUpdater(true)} style={{ display: locationUpdater ? "none" : "block" }}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"></path>
                            </svg>Ajouter une adresse
                        </button>
                        {locationUpdater ? openLocationUpdater() : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        <p style={{ display: locationUpdater ? "none" : "flex" }}><AiFillHome /><span>{userData.location}</span></p>

                        <div className="btn-container">
                            <button className="btn btn-primary btn-edit" onClick={() => setLocationUpdater(true)} style={{ display: locationUpdater ? "none" : "block" }}><i className="fas fa-pen"></i></button>
                            <button className="btn btn-primary btn-edit" onClick={handleLocationDelete} style={{ display: locationUpdater ? "none" : "block" }}><i className="fa fa-trash-alt"></i></button>
                        </div>
                        {locationUpdater ? openLocationUpdater() : null}
                    </div>
                </>
            )}
        </>
    )
}

export default LocationUpdater;