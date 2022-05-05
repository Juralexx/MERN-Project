import React from 'react'
import { categories } from '../api/categories'
import { centre, drom, est, nord, ouest, sud_est, sud_ouest } from '../api/regions'

const Footer = () => {
    let regions = [ouest, centre, sud_est, est, nord, sud_ouest, drom]
    let reg_names = ["Ouest", "Centre", "Sud-Est", "Est", "Nord", "Sud-Ouest", "DROM"]

    return (
        <div id="footer">
            <div className="container">
                <div className="row py-5 border-b">
                    <div className="col-6 col-sm-6 col-md-3">
                    <h4 className="txt-prim uppercase bold">Catégories</h4>
                        <div className="flex flex-col leading-6">
                            {categories.slice(0, 3).map((e, key) => {
                                return <a href="/" className="txt-sec" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="flex flex-col leading-6">
                            {categories.slice(3, 7).map((e, key) => {
                                return <a href="/" className="txt-sec" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="flex flex-col leading-6">
                            {categories.slice(7, 11).map((e, key) => {
                                return <a href="/" className="txt-sec" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3">
                        <div className="flex flex-col leading-6">
                            {categories.slice(11, categories.length).map((e, key) => {
                                return <a href="/" className="txt-sec" key={key}>{e.name}</a>
                            })}
                        </div>
                    </div>
                </div>
                <div className="row py-5 border-b">
                    {regions.map((arr, i) => {
                        return (
                            <div className="col-6 col-sm-6 col-md-3 mb-3" key={i}>
                                <div className="flex flex-col leading-6">
                                    <h5 className="txt-prim uppercase bold mb-2">{reg_names[i]}</h5>
                                    {arr.map((e, key) => {
                                        return <a href="/" className="txt-sec" key={key}>{e.nom_region}</a>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between py-4">
                    <div className="flex lg:flex-row flex-col">
                        <a href="/" className="txt-sec lg:mr-3">Conditions d'utilisation</a>
                        <a href="/" className="txt-sec lg:mr-3">Politique de confidentialité</a>
                        <a href="/" className="txt-sec lg:mr-3">Politique en matière de cookies</a>
                    </div>
                    <div className="flex items-center txt-sec">
                        <div className="w-7 h-7 mr-2">
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