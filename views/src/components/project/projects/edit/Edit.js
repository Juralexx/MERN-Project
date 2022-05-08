import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateProject } from '../../../../actions/project.action'
import { addActive, geoJSONStructure, geolocToFloat, ISOtoNavFormat, removeAccents } from '../../../Utils'
import { Button, OutlinedButton } from '../../../tools/components/Button'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, GeoJSON, Marker } from 'react-leaflet'
import { Oval } from 'react-loading-icons'
import { Icon } from 'leaflet'
import Title from './Title'
import State from './State'
import Tags from './Tags'
import Location from './Location'
import End from './End'
import Works from './Works'
import Content from './Content'
import Description from './Description'
import Networks from './Networks'

const Edit = ({ project }) => {
    const [title, setTitle] = useState(project.title)
    const [subtitle, setSubtitle] = useState(project.subtitle)
    const [url, setUrl] = useState(project.URL)
    const [category, setCategory] = useState(project.category)
    const [tags, setTags] = useState(project.tags)
    const [geolocalisation, setGeolocalisation] = useState(project.geolocalisation)
    const [location, setLocation] = useState(project.location)
    const [department, setDepartment] = useState(project.department)
    const [codeDepartment, setCodeDepartment] = useState(project.code_department)
    const [region, setRegion] = useState(project.region)
    const [codeRegion, setCodeRegion] = useState(project.code_region)
    const [newRegion, setNewRegion] = useState(project.new_region)
    const [codeNewRegion, setCodeNewRegion] = useState(project.code_new_region)
    const [description, setDescription] = useState(project.description)
    const [workArray, setWorkArray] = useState(project.works)
    const [end, setEnd] = useState(ISOtoNavFormat(project.end))
    const [content, setContent] = useState(project.content[0].ops)
    const [state, setState] = useState(project.state)
    const [networks, setNetworks] = useState(project.networks)
    const [geoJSON, setGeoJSON] = useState([])
    const [contentChanged, setContentChanged] = useState(false)
    const [locationChanged, setLocationChanged] = useState(false)
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nav, setNav] = useState(0)

    const handleUpdate = async () => {
        if (title === "" || title.length < 10 || title.length > 60) {
            setErr("title")
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères")
        } else if (subtitle === "" || subtitle.length < 10 || subtitle.length > 120) {
            setErr("subtitle")
            setError("Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 120 caractères")
        } else if (category === "") {
            setErr("category")
            setError("Veuillez saisir une catégorie")
        } else if (description === "" || description.length < 10 || description.length > 300) {
            setErr("description")
            setError("Veuillez ajouter une courte description à votre projet")
        } else if (content === "" || content.length < 10 || content.length > 100000) {
            setErr("content")
            setError("Veuillez saisir une description valide, votre description doit faire entre 10 et 10 000 caractères")
        } else {
            if (title !== project.title) {
                let cleanTitle = title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setTitle(cleanTitle)

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setUrl(URL)
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}`,
                data: {
                    title: title,
                    URL: url,
                    subtitle: subtitle,
                    category: category,
                    description: description,
                    tags: tags,
                    state: state,
                    geolocalisation: geolocalisation,
                    location: location,
                    department: department,
                    code_department: codeDepartment,
                    region: region,
                    code_region: codeRegion,
                    new_region: newRegion,
                    code_new_region: codeNewRegion,
                    end: end,
                    content: content,
                    works: workArray,
                    networks: networks,
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                } else {
                    dispatch(updateProject(project._id, title, URL, subtitle, category, tags, state, geolocalisation, location, department, codeDepartment, region, codeRegion, newRegion, codeNewRegion, description, end, workArray, content))
                    const redirection = navigate(`/projects/${project.URLID}/${project.URL}/about`)
                    setTimeout(redirection, 2000)
                }
            }).catch(err => console.log(err))
        }
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
    }, [project.location, locationChanged])

    return (
        <div className="content_container edit-project">
            <div className="content_box">
                <div className="header flex justify-between mb-5">
                    <h3>Modification du projet</h3>
                    <div className="flex">
                        <Link to={`/projects/${project.URLID}/${project.URL}/about`}><OutlinedButton text="Annuler" className="mx-2" /></Link>
                        <Button text="Enregistrer" onClick={handleUpdate} disabled={title === project.title && subtitle === project.subtitle && category === project.category && description === project.description && state === project.state && location === project.location && end === ISOtoNavFormat(project.end) && JSON.stringify(workArray) === JSON.stringify(project.works) && !contentChanged} />
                    </div>
                </div>
                <div className="content_nav">
                    <div className={`${addActive(nav === 0, "active")}`} onClick={() => setNav(0)}>Les bases</div>
                    <div className={`${addActive(nav === 1, "active")}`} onClick={() => setNav(1)}>Description</div>
                    <div className={`${addActive(nav === 2, "active")}`} onClick={() => setNav(2)}>Recherches</div>
                </div>
                {nav === 0 &&
                    <>
                        <div className="edit-container">
                            <Title
                                title={title}
                                setTitle={setTitle}
                                subtitle={subtitle}
                                setSubtitle={setSubtitle}
                                category={category}
                                setCategory={setCategory}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <Description
                                        description={description}
                                        setDescription={setDescription}
                                        isErr={isErr}
                                        setErr={setErr}
                                        error={error}
                                        setError={setError}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
                                    <h3>Courte description du projet</h3>
                                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <Tags
                                        tags={tags}
                                        setTags={setTags}
                                        isErr={isErr}
                                        setErr={setErr}
                                        error={error}
                                        setError={setError}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
                                    <h3>Tags et référencement</h3>
                                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <State
                                        state={state}
                                        setState={setState}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
                                    <h3>État du projet</h3>
                                    <p>La catégorie et la sous-catégorie principales permettent à vos contributeurs de trouver votre projet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <Location
                                        project={project}
                                        location={location}
                                        setLocation={setLocation}
                                        setDepartment={setDepartment}
                                        setCodeDepartment={setCodeDepartment}
                                        setRegion={setRegion}
                                        setCodeRegion={setCodeRegion}
                                        setNewRegion={setNewRegion}
                                        setCodeNewRegion={setCodeNewRegion}
                                        setGeolocalisation={setGeolocalisation}
                                        setLocationChanged={setLocationChanged}
                                        isErr={isErr}
                                        setErr={setErr}
                                        error={error}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
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
                                        <Marker style={{ marginBottom: 20 }} position={!leafletLoading ? geolocToFloat(geolocalisation) : [46.873467013745916, 2.5836305570248217]} icon={myIcon}>
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
                                    <Oval style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 60, height: 60, zIndex: 3000 }} strokeWidth="4" stroke="rgba(0, 0, 0, 0.5)" />
                                </MapContainer>
                            )}
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <End
                                        end={end}
                                        setEnd={setEnd}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
                                    <h3>Date de fin prévu (facultatif)</h3>
                                    <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-container">
                            <div className="edit-project-flex-container">
                                <div className="edit-project-flex-content-left">
                                    <Networks
                                        networks={networks}
                                        setNetworks={setNetworks}
                                        isErr={isErr}
                                        setErr={setErr}
                                        error={error}
                                        setError={setError}
                                    />
                                </div>
                                <div className="edit-project-flex-content-right">
                                    <h3>Date de fin prévu (facultatif)</h3>
                                    <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                                        Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {nav === 1 &&
                    <div className="edit-container">
                        <h3>Description</h3>
                        <p>Décrivez ce que vous souhaitez financier en évoquant l'importance que votre projet revêt à vos yeux et comment vous comptez le réaliser.
                            Parlez aussi un peu de vous. Une description complète informe les contributeurs sur l'ensemble de votre projet.
                            Si possible, ajoutez des images pour montrer votre travail et les récompenses que vous comptez produire.</p>
                        <Content
                            content={content}
                            setContent={setContent}
                            contentChanged={contentChanged}
                            setContentChanged={setContentChanged}
                        />
                    </div>
                }

                {nav === 2 &&
                    <div className="edit-container">
                        <h3>Nombre de personnes et compétences recherchées</h3>
                        <p>Saisissez l'emplacement géographique qui correspond au mieux à votre projet. Les contributeurs potentiels les verront aussi si votre projet apparaît dans les différentes catégories,
                            les résultats de recherche ou les e-mails que nous envoyons à notre communauté.</p>
                        <Works
                            workArray={workArray}
                            setWorkArray={setWorkArray}
                            isErr={isErr}
                            setErr={setErr}
                            error={error}
                            setError={setError}
                        />
                    </div>
                }
            </div>
        </div >
    )
}

export default Edit