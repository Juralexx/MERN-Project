import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useClickOutside } from "../../tools/hooks/useClickOutside";
import { ClassicInput } from "../../tools/global/Inputs";
import Oval from '../../tools/loaders/Oval'
import { ErrorCard } from "../../tools/global/ErrorCard";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { addClass, geoJSONStructure, geolocToFloat } from '../../Utils'

const Location = ({ project, location, setDatas, geolocalisation, error, setError }) => {
    const [search, setSearch] = useState({
        isSearching: false,
        query: location,
        results: [],
        isLoading: false
    })

    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => setSearch(data => ({ ...data, isSearching: false, results: [], isLoading: false })))

    const searchLocation = async () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length > 2) {
            setSearch(data => ({ ...data, isSearching: true, isLoading: true }))

            let timer
            clearTimeout(timer)
            timer = setTimeout(async () => {
                const response = await axios
                    .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${search.query}`))
                    .catch(err => console.log("Error: ", err))

                if (response.data.length > 0)
                    setSearch(data => ({ ...data, results: response.data, isLoading: false }))
                else
                    setSearch(data => ({ ...data, results: [], isLoading: false }))
            }, 1000)
        } else {
            setSearch(data => ({ ...data, isSearching: false, isLoading: false }))
        }
    }

    /**
     * 
     */

    const [geoJSON, setGeoJSON] = useState([])
    const [leafletLoading, setLeafletLoading] = useState(true)

    useEffect(() => {
        if (project.location.city || project.location.city !== location) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${location}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                    })
                    .then(() => {
                        setInterval(() => setLeafletLoading(false), 1000)
                    })
                    .catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [project.location.city, location])

    /**
     * 
     */

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
                        value={search.query}
                        onInput={searchLocation}
                        onChange={e => setSearch(data => ({ ...data, query: e.target.value }))}
                        cross
                        onClean={() => {
                            setSearch(data => ({ ...data, query: '' }))
                            setDatas(data => ({ ...data, location: project.location }))
                        }}
                    />
                    <ErrorCard
                        display={error.element === "location"}
                        text={error.error}
                        clean={() => setError({ element: "", error: "" })}
                    />

                    <div
                        ref={wrapperRef}
                        tabIndex="0"
                        className="auto-complete-container max-w-[636px] custom-scrollbar"
                        style={{ display: !search.isSearching ? "none" : "block" }}
                    >
                        {search.results.length > 0 &&
                            search.results.map((element, key) => {
                                return (
                                    <div className="auto-complete-item"
                                        key={key}
                                        onClick={() => {
                                            setSearch(data => ({ ...data, isSearching: false, query: `${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`, isLoading: false }))
                                            setDatas(data => ({
                                                ...data,
                                                location: {
                                                    city: element.COM_NOM,
                                                    department: element.DEP_NOM,
                                                    codeDepartment: element.DEP_CODE,
                                                    region: element.REG_NOM_OLD,
                                                    codeRegion: element.REG_CODE_OLD,
                                                    newRegion: element.REG_NOM,
                                                    codeNewRegion: element.REG_CODE,
                                                    geolocalisation: element.geolocalisation,
                                                }
                                            }))
                                        }}>
                                        {`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                    </div>
                                )
                            })
                        }
                        {search.isLoading && search.results.length === 0 &&
                            <div className="py-4">
                                <Oval />
                            </div>
                        }
                        {search.isSearching && search.results.length === 0 && !search.isLoading &&
                            <div className="no-result">
                                <div>Aucun résultat ne correspond à votre recherche...</div>
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
                    {geoJSON.length > 0 && !leafletLoading &&
                        <GeoJSON
                            data-location={location}
                            data={geoJSONStructure(geoJSON)}
                        />
                    }
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
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        minHeight: 300,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(5px)",
                        zIndex: 2000
                    }}></div>
                    <Oval style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 60,
                        height: 60,
                        zIndex: 3000
                    }}
                        strokeWidth="4"
                        stroke="rgba(0, 0, 0, 1)"
                    />
                </MapContainer>
            )}
        </>
    )
}

export default Location