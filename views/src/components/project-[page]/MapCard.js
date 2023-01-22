import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { geoJSONStructure, geolocToFloat } from '../Utils'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import Oval from '../tools/loaders/Oval'

const MapCard = ({ project }) => {
    const [leafletLoading, setLeafletLoading] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])

    useEffect(() => {
        if (project.location.city) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${project.location.city}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                        setInterval(() => setLeafletLoading(false), 1000)
                    }).catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [project.location.city])

    /**
     * 
     */

    return (
        <div className="content-card map_card">
            <div className="card-title">
                <h3>{project.location.city} ({project.location.code_department})</h3>
            </div>
            <div className="card-body">
                <MapContainer
                    key={!leafletLoading ? project.location.city : null}
                    center={!leafletLoading && project?.location?.geolocalisation?.length > 0 ? geolocToFloat(project.location.geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                    zoom={project.location.city ? 12 : 5}
                    minZoom={5}
                    maxZoom={project.location.city && 12}
                    dragging={!project.location.city ? false : true}
                    style={{ width: '100%', height: 300 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    {project.location.city.length > 0 && geoJSON.length > 0 && !leafletLoading &&
                        <GeoJSON
                            data-location={project.location.city}
                            data={geoJSONStructure(geoJSON)}
                        />
                    }
                    {leafletLoading &&
                        <>
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 300,
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
                                stroke="rgba(0, 0, 0, 0.5)"
                            />
                        </>
                    }
                </MapContainer>
            </div>
        </div>
    )
}

export default MapCard