import React, { useState } from "react";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";
import Modal from "../global/Modal";
import { IconInput } from "../global/Inputs";
import { departments, regions } from "./api";
import { addClass } from "../../Utils";
import Icon from "../icons/Icon";

const MapModal = ({ open, setOpen, datas, setDatas }) => {

    /* Region search */
    const [ByDepartments, setDepartments] = useState(false)
    const [openRegions, setOpenRegions] = useState(false)
    const [searchRegion, setSearchRegion] = useState(false)
    const [isRegionInResult, setRegionsInResult] = useState([])
    const [regionQuery, setRegionQuery] = useState("")
    const regexp = new RegExp(regionQuery, 'i')

    const searchRegions = () => {
        if (!regionQuery || regionQuery.trim() === "") {
            setSearchRegion(false)
        } else if (regionQuery.length >= 2) {
            let response = regions.filter(element => regexp.test(element.nom_region))
            setRegionsInResult(response)
            setSearchRegion(true)
        } else {
            setSearchRegion(false)
        }
    }

    /* Department search */
    const [openDepartments, setOpenDepartments] = useState(false)
    const [searchDepartment, setSearchDepartment] = useState(false)
    const [isDepartmentInResult, setDepartmentInResult] = useState([])
    const [departmentQuery, setDepartmentQuery] = useState("")
    const depexp = new RegExp(departmentQuery, 'i')

    const searchDepartments = () => {
        if (!departmentQuery || departmentQuery.trim() === "") {
            setSearchDepartment(false)
        } else if (departmentQuery.length >= 2) {
            let response = departments.filter(element => depexp.test(element.nom_departement))
            setDepartmentInResult(response)
            setSearchDepartment(true)
        } else {
            setSearchDepartment(false)
        }
    }

    const addDepartment = (value) => {
        setDatas(data => ({
            ...data,
            location: [...datas.location, {
                type: "department",
                department: value.nom_departement,
                department_code: value.code_department,
                region: value.nom_ancienne_region,
                region_code: value.code_ancienne_region,
                new_region: value.nom_nouvelle_region,
                new_region_code: value.code_nouvelle_region
            }]
        }))
    }

    const addRegion = (value) => {
        setDatas(data => ({
            ...data,
            location: [...datas.location, {
                type: "region",
                region: value.nom_region,
                region_code: value.code_region,
                new_region: value.nom_nouvelle_region,
                new_region_code: value.code_nouvelle_region
            }]
        }))
    }

    return (
        <Modal open={open} setOpen={setOpen} className="map_modal">
            <div className="map_modal_nav">
                <div
                    data-choice="1"
                    className={`map_modal_nav_item ${addClass(!ByDepartments, "active")}`}
                    onClick={() => setDepartments(false)}
                >
                    Régions
                </div>
                <div
                    data-choice="2"
                    className={`map_modal_nav_item ${addClass(ByDepartments, "active")}`}
                    onClick={() => setDepartments(true)}
                >
                    Départements
                </div>
            </div>
            {!ByDepartments ? (
                <div className="relative">
                    <IconInput
                        type="text"
                        placeholder="Région"
                        endIcon={<Icon name="CaretDown" />}
                        value={regionQuery}
                        onChange={e => setRegionQuery(e.target.value)}
                        onInput={searchRegions}
                        onClick={() => setOpenRegions(!openRegions)}
                    />
                    {openRegions &&
                        <div className="auto-complete-container custom-scrollbar full">
                            {!searchRegion ? (
                                regions.map((element, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className="auto-complete-item"
                                            onClick={() => {
                                                setRegionQuery(element.nom_region)
                                                addRegion(element)
                                                setOpenRegions(false)
                                            }}
                                        >
                                            {element.nom_region}
                                        </div>
                                    )
                                })
                            ) : (
                                isRegionInResult.map((element, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className="auto-complete-item"
                                            onClick={() => {
                                                setRegionQuery(element.nom_region)
                                                addRegion(element)
                                                setOpenRegions(false)
                                            }}
                                        >
                                            {element.nom_region}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    }
                    <MapRegions
                        datas={datas}
                        setDatas={setDatas}
                    />
                </div>
            ) : (
                <div className="relative">
                    <IconInput
                        type="text"
                        placeholder="Département"
                        endIcon={<Icon name="CaretDown" />}
                        value={departmentQuery}
                        onChange={e => setDepartmentQuery(e.target.value)}
                        onInput={searchDepartments}
                        onClick={() => setOpenDepartments(!openDepartments)}
                    />
                    {openDepartments &&
                        <div className="auto-complete-container custom-scrollbar full">
                            {!searchDepartment ? (
                                departments.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setDepartmentQuery(element.nom_departement); addDepartment(element); setOpenDepartments(false) }}>
                                            {element.nom_departement} ({element.code_departement})
                                        </div>
                                    )
                                })
                            ) : (
                                isDepartmentInResult.map((element, key) => {
                                    return (
                                        <div key={key} className="auto-complete-item" onClick={() => { setDepartmentQuery(element.nom_departement); addDepartment(element); setOpenDepartments(false) }}>
                                            {element.nom_departement} ({element.code_departement})
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    }
                    <MapDepartments
                        datas={datas}
                        setDatas={setDatas}
                    />
                </div>
            )}
        </Modal>
    )
}

export default MapModal;