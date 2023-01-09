import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useClickOutside } from "../../../tools/hooks/useClickOutside";
import { ClassicInput } from "../../../tools/global/Inputs";
import { BsInboxFill } from 'react-icons/bs'
import { SmallLoader } from "../../../tools/global/Loader";
import { ErrorCard } from "../../../tools/global/Error";
import { MapContainer, TileLayer, Popup, GeoJSON, Marker } from 'react-leaflet'
import { geoJSONStructure, geolocToFloat } from '../../../Utils'
import { Oval } from 'react-loading-icons'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

const Location = ({ project, location, setLocation, department, setDepartment, setCodeDepartment, region, setRegion, setCodeRegion, setNewRegion, setCodeNewRegion, setGeolocalisation, error, setError, geolocalisation }) => {
    const [searchQuery, setSearchQuery] = useState(location)
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)
    const checkErr = (name) => { if (error.element === name) return "err" }
    const [locationChanged, setLocationChanged] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])

    const setSelect = (value) => { setSearchQuery(value); setLocation(value); setDisplay(false); setLoading(false); setLocationChanged(true) }
    const handleInputChange = (e) => { setSearchQuery(e.target.value) }

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
        setGeolocalisation(project.geolocalisation)
        setLocation(project.location)
        setDepartment(project.department)
        setCodeDepartment(project.code_department)
        setRegion(project.region)
        setCodeRegion(project.code_region)
        setNewRegion(project.new_region)
        setCodeNewRegion(project.code_new_region)
    }

    const myIcon = new Icon({
        iconUrl: `${process.env.REACT_APP_API_URL}files/img/map-marker.png`,
        iconSize: [30, 40]
    })

    const [leafletLoading, setLeafletLoading] = useState(true)

    useEffect(() => {
        if (project.location || locationChanged) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${location}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                        setLocationChanged(false)
                        setInterval(() => setLeafletLoading(false), 1000)
                    }).catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [project.location, location, locationChanged])

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <p className="title full">Localité <span>Champ requis</span></p>
                    <ClassicInput
                        className={`full ${checkErr("location")}`}
                        type="text"
                        placeholder="Rechercher une adresse..."
                        value={searchQuery}
                        onInput={handleInputChange}
                        onChange={searchLocation}
                        cross
                        onClean={clean}
                    />
                    {error.element === "location" &&
                        <ErrorCard
                            display={error.element === "location"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }

                    <div tabIndex="0" className="auto-complete-container full custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                        {!isEmpty && display && isResponse &&
                            locationsFound.map((element, key) => {
                                return (
                                    <div className="auto-complete-item"
                                        onClick={() => {
                                            setSelect(`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)
                                            setLocation(element.COM_NOM)
                                            setDepartment(element.DEP_NOM)
                                            setCodeDepartment(element.DEP_CODE)
                                            setRegion(element.REG_NOM_OLD)
                                            setCodeRegion(element.REG_CODE_OLD)
                                            setNewRegion(element.REG_NOM)
                                            setCodeNewRegion(element.REG_CODE)
                                            setGeolocalisation(element.geolocalisation)
                                        }} key={key}>{`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                    </div>
                                )
                            })
                        }
                        {isLoading && isEmpty &&
                            <SmallLoader />
                        }
                        {searchQuery.length > 2 && isEmpty && !isLoading &&
                            <div className="no-result">
                                <div><BsInboxFill /></div>
                                <div>Aucun resultat ne correspond à votre recherche...</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <h3>Lieu du projet</h3>
                    <p>Saisissez l'emplacement géographique qui correspond au mieux à votre projet.</p>
                </div>
            </div>
            {!leafletLoading ? (
                <MapContainer
                    key={!leafletLoading ? location : null}
                    center={!leafletLoading ? geolocToFloat(geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                    zoom={12}
                    minZoom={5}
                    whenCreated={map => setInterval(() => { map.invalidateSize() }, 100)}
                    style={{ width: '100%', height: '100%', minHeight: 300 }}
                    className="mt-3"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    {geoJSON.length > 0 && !leafletLoading ? (
                        <GeoJSON
                            data-location={location}
                            data={geoJSONStructure(geoJSON)}
                        />
                    ) : (
                        <Marker
                            style={{ marginBottom: 20 }}
                            position={!leafletLoading ? geolocToFloat(geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                            icon={myIcon}
                        >
                            <Popup>{location}<br />{department + ", " + region}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            ) : (
                <MapContainer
                    center={[46.873467013745916, 2.5836305570248217]}
                    zoom={5}
                    minZoom={5}
                    maxZoom={5}
                    dragging="false"
                    style={{ width: '100%', height: '100%', minHeight: 300 }}
                    className="mt-3"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    <div style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%', minHeight: 300, backgroundColor: "rgba(255, 255, 255, 0.3)", backdropFilter: "blur(5px)", zIndex: 2000 }}></div>
                    <Oval
                        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 60, height: 60, zIndex: 3000 }} strokeWidth="4" stroke="rgba(0, 0, 0, 0.5)"
                    />
                </MapContainer>
            )}
        </>
    )
}

export default Location