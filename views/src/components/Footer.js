import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../api/categories'
import { centre, drom, est, nord, ouest, sud_est, sud_ouest } from '../api/regions'

const Footer = () => {
    let regions = [ouest, centre, sud_est, est, nord, sud_ouest, drom]
    let reg_names = ["Ouest", "Centre", "Sud-Est", "Est", "Nord", "Sud-Ouest", "DROM"]

    return (
        <div id="footer">
            <div className="container">
                <div className="categories row py-5">
                    <div className="col-6 col-sm-6 col-md-3">
                        <h4>Catégories</h4>
                        <div className="footer_col">
                            {categories.slice(0, 3).map((e, key) => {
                                return <Link to="/" key={key}>{e.name}</Link>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="footer_col">
                            {categories.slice(3, 7).map((e, key) => {
                                return <Link to="/" key={key}>{e.name}</Link>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="footer_col">
                            {categories.slice(7, 11).map((e, key) => {
                                return <Link to="/" key={key}>{e.name}</Link>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="footer_col">
                            {categories.slice(11, categories.length).map((e, key) => {
                                return <Link to="/" key={key}>{e.name}</Link>
                            })}
                        </div>
                    </div>
                </div>
                <div className="row py-5">
                    {regions.map((arr, i) => {
                        return (
                            <div className="col-6 col-sm-6 col-md-3 mb-3" key={i}>
                                <div className="footer_col">
                                    <h5>{reg_names[i]}</h5>
                                    {arr.map((e, key) => {
                                        return <Link to="/" key={key}>{e.nom_region}</Link>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom_top">
                        <Link to="/">Conditions d'utilisation</Link>
                        <Link to="/">Politique de confidentialité</Link>
                        <Link to="/">Politique en matière de cookies</Link>
                    </div>
                    <div className="footer-bottom_bottom">
                        <div className="w-7 h-7 mr-2">
                            <img src="/img/logo.png" alt="" />
                        </div>
                        <div>Projectit Ltd. © 2022</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer