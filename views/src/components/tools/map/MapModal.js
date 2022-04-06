import React, { useState } from "react";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";
import Modal from "../components/Modal";
import { IconInput } from "../components/Inputs";
import { BsCaretDownFill } from 'react-icons/bs'
import { departments, regions } from "./api";

const MapModal = ({ open, setOpen, location, setLocation, department, setDepartment, region, setRegion, newRegion, setNewRegion }) => {
    const [ByDepartments, setDepartments] = useState(false)
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    const [isRegionInResult, setRegionsInResult] = useState([])
    const [openRegions, setOpenRegions] = useState(false)
    const [searchRegion, setSearchRegion] = useState(false)
    const [regionQuery, setRegionQuery] = useState("")
    const regexp = new RegExp(regionQuery, 'i')

    const handleRegionChange = (e) => { setRegionQuery(e.target.value) }
    const searchRegions = () => {
        if (!regionQuery || regionQuery.trim() === "") { setSearchRegion(false) }
        else if (regionQuery.length >= 2) {
            let response = regions.filter(element => regexp.test(element.nom_region))
            setRegionsInResult(response)
            setSearchRegion(true)
        } else {
            setSearchRegion(false)
        }
    }

    const [isDepartmentInResult, setDepartmentInResult] = useState([])
    const [openDepartments, setOpenDepartments] = useState(false)
    const [searchDepartment, setSearchDepartment] = useState(false)
    const [departmentQuery, setDepartmentQuery] = useState("")
    const depexp = new RegExp(departmentQuery, 'i')

    const handleDepartmentChange = (e) => { setDepartmentQuery(e.target.value) }

    const searchDepartments = () => {
        if (!departmentQuery || departmentQuery.trim() === "") { setSearchDepartment(false) }
        else if (departmentQuery.length >= 2) {
            let response = departments.filter(element => depexp.test(element.nom_departement))
            setDepartmentInResult(response)
            setSearchDepartment(true)
        } else {
            setSearchDepartment(false)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} css="map-modal">
            <div className="map-modal-nav">
                <div data-choice="1" className={`map-modal-nav-item ${addActive(!ByDepartments, "active")}`} onClick={() => setDepartments(false)}>Régions</div>
                <div data-choice="2" className={`map-modal-nav-item ${addActive(ByDepartments, "active")}`} onClick={() => setDepartments(true)}>Départements</div>
            </div>
            {!ByDepartments ? (
                <div className="relative">
                    <IconInput
                        type="text"
                        placeholder="Région"
                        endIcon={<BsCaretDownFill />}
                        value={regionQuery}
                        onChange={handleRegionChange}
                        onInput={searchRegions}
                        onClick={() => setOpenRegions(!openRegions)}
                    />
                    {openRegions &&
                        <div className="auto-complete-container custom-scrollbar w-full">
                            {!searchRegion ? (
                                regions.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setRegionQuery(element.nom_region); setLocation(element.nom_region); setDepartment(''); setRegion(element.nom_region); setNewRegion(element.nom_nouvelle_region); setOpenRegions(false) }}>
                                            {element.nom_region}
                                        </div>
                                    )
                                })
                            ) : (
                                isRegionInResult.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setRegionQuery(element.nom_region); setLocation(element.nom_region); setDepartment(''); setRegion(element.nom_region); setNewRegion(element.nom_nouvelle_region); setOpenRegions(false) }}>
                                            {element.nom_region}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    }
                    <MapRegions location={location} setLocation={setLocation} department={department} setDepartment={setDepartment} region={region} setRegion={setRegion} newRegion={newRegion} setNewRegion={setNewRegion} />
                </div>
            ) : (
                <div className="relative">
                    <IconInput
                        type="text"
                        placeholder="Département"
                        endIcon={<BsCaretDownFill />}
                        value={departmentQuery}
                        onChange={handleDepartmentChange}
                        onInput={searchDepartments}
                        onClick={() => setOpenDepartments(!openDepartments)}
                    />
                    {openDepartments &&
                        <div className="auto-complete-container custom-scrollbar w-full">
                            {!searchDepartment ? (
                                departments.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setDepartmentQuery(element.nom_departement); setLocation(element.nom_departement); setDepartment(element.nom_departement); setRegion(element.nom_ancienne_region); setNewRegion(element.nom_nouvelle_region); setOpenDepartments(false) }}>
                                            {element.nom_departement} ({element.code_departement})
                                        </div>
                                    )
                                })
                            ) : (
                                isDepartmentInResult.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setDepartmentQuery(element.nom_departement); setLocation(element.nom_departement); setDepartment(element.nom_departement); setRegion(element.nom_ancienne_region); setNewRegion(element.nom_nouvelle_region); setOpenDepartments(false) }}>
                                            {element.nom_departement} ({element.code_departement})
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    }
                    <MapDepartments location={location} setLocation={setLocation} department={department} setDepartment={setDepartment} region={region} setRegion={setRegion} newRegion={newRegion} setNewRegion={setNewRegion} />
                </div>
            )}
        </Modal>
    )
}

export default MapModal;