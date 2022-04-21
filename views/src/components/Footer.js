import React from 'react'
import { categories } from '../api/categories'
import { centre, drom, est, nord, ouest, sud_est, sud_ouest } from '../api/regions'

const Footer = () => {
    return (
        <div id="footer">
            <div className="footer-slider">
                <div className="footer-slide-track">
                    {categories.map((category, key) => {
                        return (
                            <div className="footer-slide" key={key}>
                                <p>{category.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="content-box">
                <div className="footer-locations">
                    <div className="footer-locations-col">
                        <div className="footer-locations-bloc">
                            <div className="region-title">Ouest</div>
                            {ouest.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-locations-bloc">
                            <div className="region-title">Sud-Ouest</div>
                            {sud_ouest.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-locations-col">
                        <div className="footer-locations-bloc">
                            <div className="region-title">Sud-Est</div>
                            {sud_est.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-locations-bloc">
                            <div className="region-title">Est</div>
                            {est.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-locations-col">
                        <div className="footer-locations-bloc">
                            <div className="region-title">Nord</div>
                            {nord.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-locations-bloc">
                            <div className="region-title">Centre</div>
                            {centre.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-locations-col">
                        <div className="footer-locations-bloc">
                            <div className="region-title">Drom</div>
                            {drom.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-box">
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <a href="/">Conditions d'utilisation</a>
                        <a href="/">Politique de confidentialité</a>
                        <a href="/">Politique en matière de cookies</a>
                    </div>
                    <div className="footer-bottom-right">
                        <div>Redux Ltd. © 2022</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer