import React from "react";
import { returnNetworkSVG } from "../tools/functions/networks";

const About = ({ user }) => {
    const noContent = <em>Non renseigné</em>

    return (
        <div className="profil_page">
            <div className="header">
                <h2>À propos</h2>
            </div>
            <div className="profil_flex">
                <div className="profil_flex-left">
                    <h3>Informations générales</h3>
                </div>
                <div className="profil_flex-right">
                    <div className="profil_info_flex">
                        <div className="profil_info">
                            <p className="title_info">Pseudo</p>
                            <p className="info">{user.pseudo ? user.pseudo : noContent}</p>
                        </div>
                        <div className="profil_info">
                            <p className="title_info">Métier</p>
                            <p className="info">{user.work ? user.work : noContent}</p>
                        </div>
                    </div>
                    <div className="profil_info_flex">
                        <div className="profil_info">
                            <p className="title_info">Prénom</p>
                            <p className="info">{user.name ? user.name : noContent}</p>
                        </div>
                        <div className="profil_info">
                            <p className="title_info">Nom</p>
                            <p className="info">{user.lastname ? user.lastname : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profil_flex">
                <div className="profil_flex-left">
                    <h3>Biographie</h3>
                </div>
                <div className="profil_flex-right">
                    <p className="info mb-5 px-[10px]">{user.bio ? user.bio : noContent}</p>
                </div>
            </div>
            <div className="profil_flex">
                <div className="profil_flex-left">
                    <h3>Localisation</h3>
                </div>
                <div className="profil_flex-right">
                    <div className="profil_info_flex">
                        <div className="profil_info">
                            <p className="title_info">Ville</p>
                            <p className="info">{user.location ? user.location.COM_NOM : noContent}</p>
                        </div>
                        <div className="profil_info">
                            <p className="title_info">Département</p>
                            <p className="info">{user.location ? user.location.DEP_NOM + " (" + user.location.DEP_CODE + ")" : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profil_flex">
                <div className="profil_flex-left">
                    <h3>Coordonnées</h3>
                </div>
                <div className="profil_flex-right">
                    <div className="profil_info_flex">
                        <div className="profil_info">
                            <p className="title_info">Email</p>
                            <p className="info">{user.email}</p>
                        </div>
                        <div className="profil_info">
                            <p className="title_info">Tél.</p>
                            <p className="info">{user.phone ? user.phone : noContent}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profil_flex">
                <div className="profil_flex-left">
                    <h3>Réseaux sociaux</h3>
                </div>
                <div className="profil_flex-right">
                    <div className="profil_info_flex">
                        <div className="profil_info">
                            {user.networks.map((element, key) => {
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