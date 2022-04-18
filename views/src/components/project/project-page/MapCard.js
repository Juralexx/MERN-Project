import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { geoJSONStructure, geolocToFloat } from '../../Utils'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import Oval from 'react-loading-icons/dist/components/oval';
import axios from 'axios';

const MapCard = ({ project }) => {
    const [leafletLoading, setLeafletLoading] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])

    useEffect(() => {
        if (project.location) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${project.location}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                        setInterval(() => setLeafletLoading(false), 1000)
                    }).catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [project.location])

    return (
        <div className="project-page-card">
            <div className="card-title">
                <Link to={`/project/${project.URLID}/${project.URL}/actuality`}><h3>{project.location} ({project.code_department})</h3></Link>
            </div>
            <div className="card">
                <MapContainer
                    key={!leafletLoading ? project.location : null}
                    center={!leafletLoading && project.geolocalisation.length > 0 ? geolocToFloat(project.geolocalisation) : [46.873467013745916, 2.5836305570248217]}
                    zoom={project.location ? 12 : 5}
                    minZoom={5}
                    maxZoom={project.location && 12}
                    dragging={!project.location ? false : true}
                    style={{ width: '100%', height: 300 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    {project.location.length > 0 && geoJSON.length > 0 && !leafletLoading &&
                        <GeoJSON
                            data-location={project.location}
                            data={geoJSONStructure(geoJSON)}
                        />
                    }
                    {leafletLoading &&
                        <>
                            <div style={{ position: "absolute", top: 0, left: 0, width: '100%', height: 300, backgroundColor: "rgba(255, 255, 255, 0.3)", backdropFilter: "blur(5px)", zIndex: 2000 }}></div>
                            <Oval style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 60, height: 60, zIndex: 3000 }} strokeWidth="4" stroke="rgba(0, 0, 0, 0.5)" />
                        </>
                    }
                </MapContainer>
            </div>
        </div>
    )
}

export default MapCard