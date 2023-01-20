import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../api/categories'
import { centre, departments, drom, est, nord, ouest, sud_est, sud_ouest } from '../api/regions'
import { divideArrayIntoParts } from './Utils'

const Footer = () => {
    let regions = [ouest, centre, sud_est, est, nord, sud_ouest, drom]
    let reg_names = ["Ouest", "Centre", "Sud-Est", "Est", "Nord", "Sud-Ouest", "DROM"]

    return (
        <div id="footer">
            <div className="container">
                <div className="categories py-5">
                    <h4>Catégories</h4>
                    <div className='row'>
                        <div className="col-6 col-sm-6 col-md-3">
                            <div className="footer_col">
                                {categories.slice(0, 4).map((category, key) => {
                                    return <Link to={`/search/?category=${category.name}`} key={key}>{category.name}</Link>
                                })}
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3">
                            <div className="footer_col">
                                {categories.slice(4, 8).map((category, key) => {
                                    return <Link to={`/search/?category=${category.name}`} key={key}>{category.name}</Link>
                                })}
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3">
                            <div className="footer_col">
                                {categories.slice(8, 12).map((category, key) => {
                                    return <Link to={`/search/?category=${category.name}`} key={key}>{category.name}</Link>
                                })}
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3">
                            <div className="footer_col">
                                {categories.slice(12, categories.length).map((category, key) => {
                                    return <Link to={`/search/?category=${category.name}`} key={key}>{category.name}</Link>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='regions py-5'>
                    <h4>Régions</h4>
                    <div className="row">
                        {regions.map((arr, i) => {
                            return (
                                <div className="col-6 col-sm-6 col-md-3 mb-3" key={i}>
                                    <div className="footer_col">
                                        <h5>{reg_names[i]}</h5>
                                        {arr.map((region, key) => {
                                            return <Link to={`/search/?region=${region.nom_region}`} key={key}>{region.nom_region}</Link>
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='departments py-5'>
                    <h4>Départements</h4>
                    <div className="row">
                        {divideArrayIntoParts(departments, 6).map((arr, i) => {
                            return (
                                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3" key={i}>
                                    <div className="footer_col">
                                        {arr.map((department, key) => {
                                            return <Link to={`/search/?department=${department.nom_departement}`} key={key}>{department.nom_departement}</Link>
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
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