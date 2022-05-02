import React from 'react'
import { categories } from '../api/categories'
import { centre, drom, est, nord, ouest, sud_est, sud_ouest } from '../api/regions'

const Footer = () => {
    return (
        <div id="footer">
            <div className="box">
                <div className="footer-content">
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo-top.png`} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <div className="footer-title">Catégories</div>
                            {categories.slice(0, 4).map((e, key) => {
                                return <a href="/" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            {categories.slice(4, 10).map((e, key) => {
                                return <a href="/" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            {categories.slice(10, categories.length).map((e, key) => {
                                return <a href="/" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                </div>
                <div className="footer-content">
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <div className="footer-title">Ouest</div>
                            {ouest.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-content-bloc">
                            <div className="footer-title">Sud-Ouest</div>
                            {sud_ouest.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <div className="footer-title">Sud-Est</div>
                            {sud_est.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-content-bloc">
                            <div className="footer-title">Est</div>
                            {est.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <div className="footer-title">Nord</div>
                            {nord.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                        <div className="footer-content-bloc">
                            <div className="footer-title">Centre</div>
                            {centre.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                    <div className="footer-content-col">
                        <div className="footer-content-bloc">
                            <div className="footer-title">Drom</div>
                            {drom.map((e, key) => {
                                return <a href="/" key={key}>{e.nom_region}</a>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="box">
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <a href="/">Conditions d'utilisation</a>
                        <a href="/">Politique de confidentialité</a>
                        <a href="/">Politique en matière de cookies</a>
                    </div>
                    <div className="footer-bottom-right">
                        <div className="footer-logo">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="" />
                        </div>
                        <div>Redux Ltd. © 2022</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer