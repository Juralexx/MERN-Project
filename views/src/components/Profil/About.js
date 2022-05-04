import React from "react";
import { returnNetworkSVG } from "../tools/functions/networks";

const About = ({ user }) => {
    const noContent = <em>Non renseigné</em>

    return (
        <div className="col-12 col-lg-9">
            <div className="header">
                <h2>À propos</h2>
            </div>
            <div className="row py-6 border-b">
                <div className="col-12 col-lg-3 mb-5">
                    <h3 className="txt-sec">Informations générales</h3>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                            <p className="txt-ter mb-1">Pseudo</p>
                            <p className="txt-prim mb-1">{user.pseudo ? user.pseudo : noContent}</p>
                        </div>
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                            <p className="txt-ter mb-1">Métier</p>
                            <p className="txt-prim mb-1">{user.work ? user.work : noContent}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                            <p className="txt-ter mb-1">Prénom</p>
                            <p className="txt-prim mb-1">{user.name ? user.name : noContent}</p>
                        </div>
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                            <p className="txt-ter mb-1">Nom</p>
                            <p className="txt-prim mb-1">{user.lastname ? user.lastname : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-6 border-b">
                <div className="col-12 col-lg-3 mb-5">
                    <h3 className="txt-sec">Biographie</h3>
                </div>
                <div className="col-12 col-lg-9">
                    <p className="txt-prim mb-1">{user.bio ? user.bio : noContent}</p>
                </div>
            </div>
            <div className="row py-6 border-b">
                <div className="col-12 col-lg-3 mb-5">
                    <h3 className="txt-sec">Localisation</h3>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col col-lg-6 mb-5 lg:pr-2">
                            <p className="txt-ter mb-1">Ville</p>
                            <p className="txt-prim mb-1">{user.location ? user.location.COM_NOM : noContent}</p>
                        </div>
                        <div className="col col-lg-6 mb-5 lg:pl-2">
                            <p className="txt-ter mb-1">Département</p>
                            <p className="txt-prim mb-1">{user.location ? user.location.DEP_NOM + " (" + user.location.DEP_CODE + ")" : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-6 border-b">
                <div className="col-12 col-lg-3 mb-5">
                    <h3 className="txt-sec">Coordonnées</h3>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col col-lg-6 mb-5 lg:pr-2">
                            <p className="txt-ter mb-1">Email</p>
                            <p className="txt-prim mb-1">{user.email}</p>
                        </div>
                        <div className="col col-lg-6 mb-5 lg:pl-2">
                            <p className="txt-ter mb-1">Tél.</p>
                            <p className="txt-prim mb-1">{user.phone ? user.phone : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-6">
                <div className="col-12 col-lg-3 mb-5">
                    <h3 className="txt-sec">Réseaux sociaux</h3>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="profil_info">
                            {user?.networks?.map((element, key) => {
                                return (
                                    <div className="networks-item" key={key}>
                                        {returnNetworkSVG(element.type)}
                                        <a href={element.url} rel="noreferrer" target="_blank">{element.url}</a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;