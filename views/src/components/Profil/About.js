import React from "react";
import { returnNetworkSVG } from "../tools/functions/networks";

const About = ({ user }) => {
    return (
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
                            <p className="txt-sec mb-1">{user.pseudo ? user.pseudo : <em>Non renseigné</em>}</p>
                        </div>
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                            <p className="txt-ter mb-1">Métier</p>
                            <p className="txt-sec mb-1">{user.work ? user.work : <em>Non renseigné</em>}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                            <p className="txt-ter mb-1">Prénom</p>
                            <p className="txt-sec mb-1">{user.name ? user.name : <em>Non renseigné</em>}</p>
                        </div>
                        <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                            <p className="txt-ter mb-1">Nom</p>
                            <p className="txt-sec mb-1">{user.lastname ? user.lastname : <em>Non renseigné</em>}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-6 border-b">
                <div className="col-12 col-lg-3 mb-5">
                    <h5 className="txt-prim">Biographie</h5>
                </div>
                <div className="col-12 col-lg-9">
                    <p className="txt-sec mb-1">{user.bio ? user.bio : <em>Non renseigné</em>}</p>
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
                            <p className="txt-sec mb-1">{user.location ? user.location.COM_NOM : <em>Non renseigné</em>}</p>
                        </div>
                        <div className="col col-lg-6 mb-5 lg:pl-2">
                            <p className="txt-ter mb-1">Département</p>
                            <p className="txt-sec mb-1">{user.location ? user.location.DEP_NOM + " (" + user.location.DEP_CODE + ")" : <em>Non renseigné</em>}</p>
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
                                {user.phone ? <a href={'tel:' + user.phone}>{user.phone}</a> : <em>Non renseigné</em>}
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