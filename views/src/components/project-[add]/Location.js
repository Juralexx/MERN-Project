import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { addClass, geoJSONStructure, geolocToFloat, removeAccents, removeSpecialChars } from '../Utils'
import { useClickOutside } from '../tools/hooks/useClickOutside';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { ClassicInput } from '../tools/global/Inputs';
import Icon from '../tools/icons/Icon';
import Oval from '../tools/loaders/Oval'
import { ErrorCard } from '../tools/global/Error';

const Location = ({ datas, setDatas, setError, error }) => {

    const [leafletLoading, setLeafletLoading] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])

    useEffect(() => {
        if (datas.location) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${datas.location}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                        setInterval(() => setLeafletLoading(false), 1000)
                    }).catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [datas.location])

    const [search, setSearch] = useState({ query: "", results: [] })
    const [isLoading, setLoading] = useState(false)

    const wrapperRef = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(wrapperRef, () => {
        setDisplay(false)
        setLoading(false)
    })

    const searchLocation = async () => {
        if (!search.query || search.query.trim() === "") return
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${search.query}`))
                .catch((err) => { console.log("Error: ", err) })
            if (response) {
                setSearch(data => ({ ...data, results: response.data }))
                setLoading(true)
                if (search.query.length > 2) {
                    setDisplay(true)
                    setLoading(true)
                    if (search.results.length === 0) {
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    return (
        <div className="add-project-card">
            <h2>Localisation</h2>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h4>Lieu du projet</h4>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                    <p>
                        Les contributeurs potentiels les verront aussi si votre projet apparaît dans les différentes catégories,
                        les résultats de recherche ou les e-mails que nous envoyons à notre communauté.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center relative !mt-4 lg:!mt-0">
                    <div>
                        <p className="title full">Localité <span>Champs requis</span></p>
                        <ClassicInput
                            className={`full ${addClass(error.element === "location", 'err')}`}
                            type="text"
                            placeholder="Rechercher une adresse..."
                            value={search.query}
                            onInput={e => setSearch(data => ({ ...data, query: removeSpecialChars(removeAccents(e.target.value)) }))}
                            onChange={searchLocation}
                            cross
                            onClean={() => {
                                setSearch(data => ({ ...data, query: '' }))
                                setDatas(data => ({
                                    ...data,
                                    location: "",
                                    geolocalisation: "",
                                    department: "",
                                    codeDepartment: "",
                                    region: "",
                                    codeRegion: "",
                                    newRegion: "",
                                    codeNewRegion: "",
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
                            className="auto-complete-container custom-scrollbar max-w-[636px]"
                            style={{ display: search.query.length < 3 || !display ? "none" : "block" }}
                        >
                            {search.results.length > 0 &&
                                display && (
                                    search.results.map((element, key) => {
                                        return (
                                            <div
                                                key={key}
                                                className="auto-complete-item"
                                                onClick={() => {
                                                    setDatas(data => ({
                                                        ...data,
                                                        location: element.COM_NOM,
                                                        geolocalisation: element.geolocalisation,
                                                        department: element.DEP_NOM,
                                                        codeDepartment: element.DEP_CODE,
                                                        region: element.REG_NOM_OLD,
                                                        codeRegion: element.REG_CODE_OLD,
                                                        newRegion: element.REG_NOM,
                                                        codeNewRegion: element.REG_CODE,
                                                    }))
                                                    setSearch(data => ({ ...data, query: `${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}` }))
                                                    setDisplay(false)
                                                    setLoading(false)
                                                }}
                                            >
                                                {`${element.COM_NOM} - `}<em>{element.DEP_NOM_NUM}, {element.REG_NOM_OLD}</em>
                                            </div>
                                        )
                                    })
                                )}
                            {isLoading &&
                                search.results.length === 0 && (
                                    <Oval />
                                )
                            }
                            {search.query.length > 2 &&
                                search.results.length === 0 &&
                                !isLoading && (
                                    <div className="no-result">
                                        <Icon name="BoxEmpty" />
                                        <div>Aucun resultat ne correspond à votre recherche...</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <MapContainer
                key={!leafletLoading ? datas.location : null}
                center={!leafletLoading && datas.geolocalisation.length > 0 ? geolocToFloat(datas.geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                zoom={datas.location ? 12 : 5}
                minZoom={5}
                maxZoom={datas.location && 12}
                dragging={!datas.location ? false : true}
                style={{ width: '100%', height: 300, marginTop: "20px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                />
                {datas.location.length > 0 && geoJSON.length > 0 && !leafletLoading &&
                    <GeoJSON
                        data-location={datas.location}
                        data={geoJSONStructure(geoJSON)}
                    />
                }
                {leafletLoading &&
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: 300,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(5px)",
                            zIndex: 2000
                        }}>
                        <Oval
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 60,
                                height: 60,
                                zIndex: 3000
                            }}
                            strokeWidth="4"
                            stroke="rgba(0, 0, 0, 0.5)"
                        />
                    </div>
                }
            </MapContainer>
        </div>
    )
}

export default Location