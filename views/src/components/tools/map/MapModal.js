import React, { useState } from "react";
import Icon from "../icons/Icon";
import { IconInput } from "../global/Inputs";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";
import Modal from "../global/Modal";
import { departments, regions } from "./api";
import { addClass } from "../../Utils";
import styled from "styled-components";

const MapModal = ({ open, setOpen, datas, setDatas }) => {

    const [search, setSearch] = useState({ type: 'region', open: '', state: false, query: '', results: [] })
    const regexp = new RegExp(search.query, 'i')

    const searchLocation = () => {
        if (!search.query || search.query.trim() === "") {
            setSearch(prevState => ({ ...prevState, open: '' }))
        } else if (search.query.length >= 2) {
            if (search.type === 'region') {
                const response = regions.filter(element => regexp.test(element.nom_region))
                if (response.length > 0) {
                    setSearch(data => ({ ...data, open: 'region', state: true, results: response }))
                }
            } else if (search.type === 'department') {
                const response = departments.filter(element => regexp.test(element.nom_departement))
                console.log(response)
                if (response.length > 0) {
                    setSearch(data => ({ ...data, open: 'department', state: true, results: response }))
                }
            }
        } else {
            setSearch(data => ({ ...data, open: '', state: false, results: [] }))
        }
    }

    const addLocation = (value, type) => {
        if (type === 'department') {
            setDatas(data => ({
                ...data,
                location: [...datas.location, {
                    type: "department",
                    department: value.nom_departement,
                    department_code: value.code_departement,
                    region: value.nom_ancienne_region,
                    region_code: value.code_ancienne_region,
                    new_region: value.nom_nouvelle_region,
                    new_region_code: value.code_nouvelle_region
                }]
            }))
        } else {
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
    }

    /**
     * 
     */

    return (
        <Modal open={open} setOpen={setOpen} className="map_modal">
            <MapMapComponent>
                <div className="map_modal_nav">
                    <div data-choice="1"
                        className={`map_modal_nav_item ${addClass(search.type === 'region', "active")}`}
                        onClick={() => setSearch(prevState => ({ ...prevState, type: 'region' }))}
                    >
                        Régions
                    </div>
                    <div data-choice="2"
                        className={`map_modal_nav_item ${addClass(search.type === 'department', "active")}`}
                        onClick={() => setSearch(prevState => ({ ...prevState, type: 'department' }))}
                    >
                        Départements
                    </div>
                </div>
                {search.type === 'region' &&
                    <div className="relative">
                        <IconInput
                            type="text"
                            placeholder="Région"
                            endIcon={<Icon name="CaretDown" />}
                            value={search.query}
                            onChange={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                            onInput={searchLocation}
                            onClick={() => setSearch(prevState => ({ ...prevState, open: prevState.open === 'region' ? '' : 'region' }))}
                        />
                        {search.open === 'region' &&
                            <div className="auto-complete-container custom-scrollbar full">
                                {!search.state ? (
                                    regions.map((element, key) => {
                                        return (
                                            <div
                                                key={key}
                                                className="auto-complete-item"
                                                onClick={() => {
                                                    setSearch(prevState => ({ ...prevState, query: element.nom_region, open: '' }))
                                                    addLocation(element, 'region')
                                                }}
                                            >
                                                {element.nom_region}
                                            </div>
                                        )
                                    })
                                ) : (
                                    search.results.map((element, key) => {
                                        return (
                                            <div
                                                key={key}
                                                className="auto-complete-item"
                                                onClick={() => {
                                                    setSearch(prevState => ({ ...prevState, query: element.nom_region, open: '' }))
                                                    addLocation(element, 'region')
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
                }
                {search.type === 'department' &&
                    <div className="relative">
                        <IconInput
                            type="text"
                            placeholder="Département"
                            endIcon={<Icon name="CaretDown" />}
                            value={search.query}
                            onChange={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                            onInput={searchLocation}
                            onClick={() => setSearch(prevState => ({ ...prevState, open: prevState.open === 'department' ? '' : 'department' }))}
                        />
                        {search.open === 'department' &&
                            <div className="auto-complete-container custom-scrollbar full">
                                {!search.state ? (
                                    departments.map((element, key) => {
                                        return (
                                            <div key={key} className="auto-complete-item" onClick={() => {
                                                setSearch(prevState => ({ ...prevState, query: element.nom_departement, open: '' }))
                                                addLocation(element, 'department')
                                            }}>
                                                {element.nom_departement} ({element.code_departement})
                                            </div>
                                        )
                                    })
                                ) : (
                                    search.results.map((element, key) => {
                                        return (
                                            <div key={key} className="auto-complete-item" onClick={() => {
                                                setSearch(prevState => ({ ...prevState, query: element.nom_departement, open: '' }))
                                                addLocation(element, 'department')
                                            }}>
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
                }
            </MapMapComponent>
        </Modal>
    )
}

export default MapModal;

const MapMapComponent = styled.div`
    .map_modal_nav {
        display       : flex;
        position      : relative;
        width         : 70%;
        margin-bottom : 16px;

        .map_modal_nav_item {
            position      : relative;
            height        : 100%;
            width         : 50%;
            text-align    : center;
            color         : var(--text);
            cursor        : pointer;
            padding       : 5px;
            margin        : 0 3px;
            overflow      : hidden;
            border-radius : var(--rounded-sm);

            &.active {
                color      : var(--primary);
                background : rgba(var(--primary-rgb), 0.2);
            }
            &:hover {
                color      : var(--primary);
                background : var(--light);
            }
        }
    }

    @media(max-width: 576px) {
        .map {
            margin-top : 30px;
        }
    }
`