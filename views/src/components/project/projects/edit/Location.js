import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useClickOutside } from "../../../tools/hooks/useClickOutside";
import { ClassicInput } from "../../../tools/global/Inputs";
import Oval from '../../../tools/loaders/Oval'
import { ErrorCard } from "../../../tools/global/Error";
import { MapContainer, TileLayer, Popup, GeoJSON, Marker } from 'react-leaflet'
import { addClass, geoJSONStructure, geolocToFloat } from '../../../Utils'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

const Location = ({ project, location, department, region, setDatas, geolocalisation, error, setError }) => {
    const [searchQuery, setSearchQuery] = useState(location)
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => {
        setDisplay(false)
        setLoading(false)
    })

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`))
                .catch(err => console.log("Error: ", err))
            if (response) {
                setLocationsFound(response.data)
                if (searchQuery.length > 2) {
                    setDisplay(true)
                    setLoading(true)
                    if (locationsFound.length > 0) {
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    const myIcon = new Icon({
        iconUrl: `${process.env.REACT_APP_API_URL}files/img/map-marker.png`,
        iconSize: [30, 40]
    })

    const [locationChanged, setLocationChanged] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])
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
                <div className="col-12 col-lg-6">
                    <h3>Lieu du projet</h3>
                    <p>Saisissez l'emplacement géographique qui correspond au mieux à votre projet.</p>
                </div>
                <div className="col-12 col-lg-6 relative">
                    <div className="title full">Localité <span>Champ requis</span></div>
                    <ClassicInput
                        className={`full ${addClass(error.element === "location", 'err')}`}
                        type="text"
                        placeholder="Rechercher une adresse..."
                        value={searchQuery}
                        onInput={e => setSearchQuery(e.target.value)}
                        onChange={searchLocation}
                        cross
                        onClean={() => {
                            setSearchQuery("")
                            setDatas(data => ({
                                ...data,
                                location: project.location,
                                department: project.department,
                                codeDepartment: project.code_department,
                                region: project.region,
                                codeRegion: project.code_region,
                                newRegion: project.new_region,
                                codeNewRegion: project.code_new_region,
                                geolocalisation: project.geolocalisation,
                            }))
                        }}
                    />
                    {error.element === "location" &&
                        <ErrorCard
                            display={error.element === "location"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }

                    <div
                        ref={wrapperRef}
                        tabIndex="0"
                        className="auto-complete-container max-w-[660px] custom-scrollbar"
                        style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }}
                    >
                        {display && locationsFound.length > 0 &&
                            locationsFound.map((element, key) => {
                                return (
                                    <div
                                        className="auto-complete-item"
                                        key={key}
                                        onClick={() => {
                                            setSearchQuery(`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)
                                            setDatas(data => ({
                                                ...data,
                                                location: element.COM_NOM,
                                                department: element.DEP_NOM,
                                                codeDepartment: element.DEP_CODE,
                                                region: element.REG_NOM_OLD,
                                                codeRegion: element.REG_CODE_OLD,
                                                newRegion: element.REG_NOM,
                                                codeNewRegion: element.REG_CODE,
                                                geolocalisation: element.geolocalisation,
                                            }))
                                            setDisplay(false)
                                            setLoading(false)
                                            setLocationChanged(true)
                                        }}
                                    >
                                        {`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                    </div>
                                )
                            })
                        }
                        {isLoading && locationsFound.length === 0 &&
                            <Oval />
                        }
                        {searchQuery.length > 2 && locationsFound.length === 0 && !isLoading &&
                            <div className="no-result">
                                <div>Aucun resultat ne correspond à votre recherche...</div>
                            </div>
                        }
                    </div>
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