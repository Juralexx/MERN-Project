import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Route, Routes, useLocation, Link } from 'react-router-dom'
import Footer from "../components/Footer";
import Oval from "../components/tools/loaders/Oval";
import Card from "../components/tools/components/Card";
import Icon from "../components/tools/icons/Icon";
import { addClass, dateParser, fullImage } from "../components/Utils";
import { replaceHTTP, returnNetworkSVG } from "../components/tools/functions/networks";

const UserProfil = ({ user, websocket }) => {
    const { pseudo } = useParams()
    const [userProfil, setUserProfil] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/profil/${pseudo}`)
                if (data.pseudo) setUserProfil(data)
                else navigate('/')
            } catch (err) {
                console.error(err)
            }
        }
        fetch()
    }, [pseudo, navigate])

    const [projects, setProjects] = useState({
        created: [],
        participations: []
    })
    const [projectsToDisplay, setProjectsToDisplay] = useState({
        type: "created",
        array: []
    })
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (userProfil.projects) {
            const fetch = () => {
                setLoading(true)
                const promises = userProfil.projects.map(async id => {
                    return await axios
                        .get(`${process.env.REACT_APP_API_URL}api/project/${id}`)
                        .then(res => res.data)
                        .catch(err => console.log(err))
                })
                Promise.all(promises).then(res => {
                    setProjects({
                        created: res.filter(pros => pros.poster._id === userProfil._id),
                        participations: res.filter(pros => pros.poster._id !== userProfil._id)
                    })
                    setProjectsToDisplay({
                        type: "created",
                        array: res.filter(pros => pros.poster._id === userProfil._id)
                    })
                    setLoading(false)
                })
            }
            fetch()
        }
    }, [userProfil, projects.type])

    return (
        <div className="profil_container">
            <div className="profil_header">
                <div className="profil_cover_img" style={fullImage(userProfil?.cover_picture)}></div>
                <div className="container relative">
                    <div className="avatar" style={fullImage(userProfil?.picture)}></div>
                    <div className="content_nav">
                        <Link to={`/user/${userProfil.pseudo}`} className={addClass(location.pathname === '/user/' + userProfil.pseudo, 'active')}>
                            Profil
                        </Link>
                        <Link to={`/user/${userProfil.pseudo}/projects`} className={addClass(location.pathname === '/user/' + userProfil.pseudo + 'projects', 'active')}>
                            Projets
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-8 pb-[150px]">
                <div className="row">
                    <div className="col-12 col-lg-3 md:pr-5 mb-8">
                        <div className='row'>
                            <div className='col-12 col-sm-6 col-lg-12'>
                                <div className="f-24 bold txt-prim mb-2">{userProfil?.pseudo}</div>
                                <p className="flex items-center mb-1">
                                    <Icon name="Calendar" className="mr-2" />inscrit le {dateParser(userProfil.createdAt)}
                                </p>
                                {userProfil.location &&
                                    <p className="flex items-center mb-1">
                                        <Icon name="Position" className="mr-2" />
                                        {userProfil?.location?.COM_NOM}, {userProfil?.location?.DEP_NOM} ({userProfil?.location?.DEP_CODE})
                                    </p>
                                }
                                {userProfil.work &&
                                    <p className="flex items-center">
                                        <Icon name="User" className="mr-2" /> {userProfil?.work}
                                    </p>
                                }
                            </div>
                            <div className='col-12 col-sm-6 col-lg-12'>
                                <div className="networks pt-5">
                                    {userProfil?.networks?.map((e, i) => {
                                        return (
                                            <div className="networks-item" key={i}>
                                                {returnNetworkSVG(e.type)}
                                                <a href={e.url} rel="noreferrer" target="_blank">{replaceHTTP(e.url)}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route index element={
                            <div className="col-12 col-lg-9">
                                <h2 className="pb-5">À propos</h2>
                                <div className="row py-6 border-b">
                                    <div className="col-12 col-lg-3 mb-5">
                                        <h5 className="txt-prim">Informations générales</h5>
                                    </div>
                                    <div className="col-12 col-lg-9">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                                                <p className="txt-ter mb-1">Pseudo</p>
                                                <p className="txt-sec mb-1">{userProfil?.pseudo ? userProfil.pseudo : <em>Non renseigné</em>}</p>
                                            </div>
                                            <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                                <p className="txt-ter mb-1">Métier</p>
                                                <p className="txt-sec mb-1">{userProfil?.work ? userProfil.work : <em>Non renseigné</em>}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                                                <p className="txt-ter mb-1">Prénom</p>
                                                <p className="txt-sec mb-1">{userProfil?.name ? userProfil.name : <em>Non renseigné</em>}</p>
                                            </div>
                                            <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                                <p className="txt-ter mb-1">Nom</p>
                                                <p className="txt-sec mb-1">{userProfil?.lastname ? userProfil.lastname : <em>Non renseigné</em>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-6 border-b">
                                    <div className="col-12 col-lg-3 mb-5">
                                        <h5 className="txt-prim">Biographie</h5>
                                    </div>
                                    <div className="col-12 col-lg-9">
                                        <p className="txt-sec mb-1">{userProfil?.bio ? userProfil.bio : <em>Non renseigné</em>}</p>
                                    </div>
                                </div>
                                <div className="row py-6 border-b">
                                    <div className="col-12 col-lg-3 mb-5">
                                        <h5 className="txt-prim">Localisation</h5>
                                    </div>
                                    <div className="col-12 col-lg-9">
                                        <div className="row">
                                            <div className="col col-lg-6 mb-5 lg:pr-2">
                                                <p className="txt-ter mb-1">Ville</p>
                                                <p className="txt-sec mb-1">{userProfil?.location ? userProfil.location.COM_NOM : <em>Non renseigné</em>}</p>
                                            </div>
                                            <div className="col col-lg-6 mb-5 lg:pl-2">
                                                <p className="txt-ter mb-1">Département</p>
                                                <p className="txt-sec mb-1">{userProfil?.location ? userProfil.location.DEP_NOM + " (" + userProfil.location.DEP_CODE + ")" : <em>Non renseigné</em>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-6 border-b">
                                    <div className="col-12 col-lg-3 mb-5">
                                        <h5 className="txt-prim">Coordonnées</h5>
                                    </div>
                                    <div className="col-12 col-lg-9">
                                        <div className="row">
                                            <div className="col col-lg-6 mb-5 lg:pr-2">
                                                <p className="txt-ter mb-1">Email</p>
                                                <p className="txt-sec mb-1">
                                                    <a href={'mailto:' + userProfil.email}>{userProfil.email}</a>
                                                </p>
                                            </div>
                                            <div className="col col-lg-6 mb-5 lg:pl-2">
                                                <p className="txt-ter mb-1">Tél.</p>
                                                <p className="txt-sec mb-1">
                                                    {userProfil?.phone ? <a href={'tel:' + userProfil.phone}>{userProfil.phone}</a> : <em>Non renseigné</em>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-6">
                                    <div className="col-12 col-lg-3 mb-5">
                                        <h5 className="txt-prim">Réseaux sociaux</h5>
                                    </div>
                                    <div className="col-12 col-lg-9">
                                        <div className="row">
                                            <div className="profil_info">
                                                {userProfil?.networks?.length > 0 ? (
                                                    userProfil?.networks?.map((element, key) => {
                                                        return (
                                                            <div className="networks-item" key={key}>
                                                                {returnNetworkSVG(element.type)}
                                                                <a href={element.url} rel="noreferrer" target="_blank">{element.url}</a>
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    <p className="txt-sec">
                                                        <em>Non renseigné</em>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="projects" element={
                            <div className="col-12 col-lg-9">
                                <div className="content_nav !mb-4 custom-scrollbar-x">
                                    <div
                                        className={addClass(projectsToDisplay.type === "created", 'active')}
                                        onClick={() => setProjectsToDisplay({ type: 'created', array: projects.created })}
                                    >
                                        Projets créés <span>{userProfil.projects?.length}</span>
                                    </div>
                                    <div
                                        className={addClass(projectsToDisplay.type === "participations", 'active')}
                                        onClick={() => setProjectsToDisplay({ type: 'participations', array: projects.participations })}
                                    >
                                        Participations <span>{userProfil.favorites?.length}</span>
                                    </div>
                                </div>
                                <div className="profil-page_body !justify-start">
                                    {!isLoading ? (
                                        projectsToDisplay.array.length > 0 ? (
                                            <div className="profil-page_projects !justify-start">
                                                {projectsToDisplay.array.map((element, key) => {
                                                    return (
                                                        <Card
                                                            key={key}
                                                            project={element}
                                                            user={user}
                                                            websocket={websocket}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="empty-content">
                                                <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun projets à afficher..." />
                                                <p>Aucun projets à afficher...</p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="loading-container">
                                            <Oval />
                                        </div>
                                    )}
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfil