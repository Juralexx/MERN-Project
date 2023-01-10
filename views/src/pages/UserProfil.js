import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'
import { dateParser } from "../components/Utils";
import { avatar, coverPicture } from "../components/tools/hooks/useAvatar";
import { replaceHTTP, returnNetworkSVG } from "../components/tools/functions/networks";
import Footer from "../components/Footer";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

const UserProfil = () => {
    const { pseudo } = useParams()
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/profil/${pseudo}`)
                data.pseudo ? setUser(data) : navigate('/')

            } catch (err) {
                console.error(err)
            }
        }
        fetch()
    }, [pseudo, navigate])

    return (
        <div className="profil_container">
            <div className="profil_header">
                <div className="profil_cover_img" style={coverPicture(user?.cover_picture)}></div>
                <div className="container relative">
                    <div className="avatar" style={avatar(user?.picture)}></div>
                </div>
            </div>
            <div className="container mt-8 pb-[100px]">
                <div className="row">
                    <div className="col-12 col-lg-3 md:pr-5 mb-8">
                        <div className='row'>
                            <div className='col-12 col-sm-6 col-lg-12'>
                                <div className="f-24 bold txt-prim mb-2">{user?.pseudo}</div>
                                <p className="flex items-center mb-1">
                                    <MdOutlineCalendarToday className="mr-2 primary" />inscrit le {dateParser(user.createdAt)}
                                </p>
                                {user.location &&
                                    <p className="flex items-center mb-1">
                                        <HiOutlineLocationMarker className="mr-2 primary" />
                                        {user?.location?.COM_NOM}, {user?.location?.DEP_NOM} ({user?.location?.DEP_CODE})
                                    </p>
                                }
                                {user.work &&
                                    <p className="flex items-center">
                                        <FaUserShield className="mr-2 primary" /> {user?.work}
                                    </p>
                                }
                            </div>
                            <div className='col-12 col-sm-6 col-lg-12'>
                                <div className="networks pt-5">
                                    {user?.networks?.map((e, i) => {
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
                                        <p className="txt-sec mb-1">{user?.pseudo ? user.pseudo : <em>Non renseigné</em>}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Métier</p>
                                        <p className="txt-sec mb-1">{user?.work ? user.work : <em>Non renseigné</em>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Prénom</p>
                                        <p className="txt-sec mb-1">{user?.name ? user.name : <em>Non renseigné</em>}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Nom</p>
                                        <p className="txt-sec mb-1">{user?.lastname ? user.lastname : <em>Non renseigné</em>}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h5 className="txt-prim">Biographie</h5>
                            </div>
                            <div className="col-12 col-lg-9">
                                <p className="txt-sec mb-1">{user?.bio ? user.bio : <em>Non renseigné</em>}</p>
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
                                        <p className="txt-sec mb-1">{user?.location ? user.location.COM_NOM : <em>Non renseigné</em>}</p>
                                    </div>
                                    <div className="col col-lg-6 mb-5 lg:pl-2">
                                        <p className="txt-ter mb-1">Département</p>
                                        <p className="txt-sec mb-1">{user?.location ? user.location.DEP_NOM + " (" + user.location.DEP_CODE + ")" : <em>Non renseigné</em>}</p>
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
                                            <a href={'mailto:' + user.email}>{user.email}</a>
                                        </p>
                                    </div>
                                    <div className="col col-lg-6 mb-5 lg:pl-2">
                                        <p className="txt-ter mb-1">Tél.</p>
                                        <p className="txt-sec mb-1">
                                            {user?.phone ? <a href={'tel:' + user.phone}>{user.phone}</a> : <em>Non renseigné</em>}
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
                                        {user?.networks?.length > 0 ? (
                                            user?.networks?.map((element, key) => {
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
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfil