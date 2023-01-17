import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import { returnNetworkSVG } from '../tools/functions/networks';
import { deleteItemFromArray, onlyLettersSpacesAndDashes } from '../Utils';
import { updateUser } from '../../reducers/user.action';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { TextButton, Button } from '../tools/global/Button';
import { ErrorCard } from '../tools/global/Error';
import { ClassicInput, Textarea } from '../tools/global/Inputs';
import Oval from '../../components/tools/loaders/Oval'
import EditPassword from './EditPassword';
import Icon from '../tools/icons/Icon'

const Edit = ({ user }) => {
    const [userDatas, setUserDatas] = useState({
        name: user.name,
        lastname: user.lastname,
        work: user.work,
        bio: user.bio,
        phone: user.phone,
        location: user.location?.COM_NOM,
        networks: user.networks,
        password: user.password,
    })
    const [password, setPassword] = useState({
        password: user.password,
        newPassword: "",
        confirmedNewPassword: "",
    })
    const [error, setError] = useState({ element: "", error: "" })
    const checkErr = name => { if (error.element === name) return "err" }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user)
            setUserDatas({
                name: user.name,
                lastname: user.lastname,
                work: user.work,
                bio: user.bio,
                phone: user.phone,
                networks: user.networks,
                password: user.password,
            })
    }, [user])

    const [searchQuery, setSearchQuery] = useState(user.location?.COM_NOM || "")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios
                .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`))
                .catch(err => { console.log("Error: ", err) })
            if (response) {
                setLocationsFound(response.data)
                if (searchQuery.length > 2) {
                    setDisplay(true)
                    setLoading(true)
                    if (!locationsFound || locationsFound.length === 0) {
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => {
        setDisplay(false)
        setLoading(false)
    })

    const onSelect = (object, value) => {
        setSearchQuery(value)
        setUserDatas(datas => ({ ...datas, location: object }))
        setDisplay(false)
        setLoading(false)
    }

    const [network, setNetwork] = useState("")

    const handleNetwork = () => {
        if (isURL(network)) {
            let site = ""
            if (network.includes("facebook"))
                site = "facebook"
            else if (network.includes("instagram"))
                site = "instagram"
            else if (network.includes("twitter"))
                site = "twitter"
            else if (network.includes("snapchat"))
                site = "snapchat"
            else if (network.includes("youtube"))
                site = "youtube"
            else if (network.includes("twitch"))
                site = "twitch"
            else if (network.includes("pinterest"))
                site = "pinterest"
            else if (network.includes("linkedin"))
                site = "linkedin"
            else site = "website"
            setUserDatas(datas => ({ ...datas, networks: [...userDatas.networks, { type: site, url: network }] }))
            setNetwork("")
            setError({ element: "", error: "" })
        } else setError({
            element: "networks",
            error: "Veuillez saisir une adresse URL valide"
        })
    }

    const handleUpdate = async () => {
        if (userDatas.name.length > 0 && !onlyLettersSpacesAndDashes(userDatas.name)) {
            setError({
                element: "name",
                error: "Veuillez saisir un prénom valide"
            })
        } else if (userDatas.lastname.length > 0 && !onlyLettersSpacesAndDashes(userDatas.lastname)) {
            setError({
                element: "lastname",
                error: "Veuillez saisir un nom valide"
            })
        } else if (userDatas.work.length > 0 && !onlyLettersSpacesAndDashes(userDatas.work)) {
            setError({
                element: "work",
                error: "Veuillez saisir un métier valide"
            })
        } else if (userDatas.phone.length > 0 && !isMobilePhone(userDatas.phone)) {
            setError({
                element: "phone",
                error: "Veuillez saisir un numéro de téléphone valide"
            })
        } else {
            if (Object.keys(userDatas.location).length === 0) {
                setUserDatas(datas => ({ ...datas, location: {} }))
            }
            dispatch(updateUser(
                user._id,
                userDatas.name,
                userDatas.lastname,
                userDatas.work,
                userDatas.bio,
                userDatas.location,
                userDatas.phone,
                userDatas.networks
            ))
                .then(() => setTimeout(navigate(`/profil/about`), 2000))
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <div className="content_nav !my-4">
                <NavLink to="/profil/edit">Mon compte</NavLink>
                <NavLink to="password">Mot de passe</NavLink>
            </div>
            <Routes>
                <Route index element={
                    <>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Informations générales</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-5 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Pseudo</p>
                                        <div className="flex items-center">
                                            <Icon name="Lock" className="mr-1 w-4 h-4" />{user.pseudo}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Métier</p>
                                        <ClassicInput
                                            className={`full ${checkErr("work")}`}
                                            type="text"
                                            placeholder="Métier..."
                                            onChange={e => setUserDatas(datas => ({ ...datas, work: e.target.value }))}
                                            value={userDatas.work}
                                        />
                                        {error.element === "work" &&
                                            <ErrorCard
                                                display={error.element === "work"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-5 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Prénom</p>
                                        <ClassicInput
                                            className={`full ${checkErr("name")}`}
                                            type="text"
                                            placeholder="Prénom..."
                                            onChange={e => setUserDatas(datas => ({ ...datas, name: e.target.value }))}
                                            value={userDatas.name}
                                        />
                                        {error.element === "name" &&
                                            <ErrorCard
                                                display={error.element === "name"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }
                                    </div>
                                    <div className="col-12 col-md-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Nom</p>
                                        <ClassicInput
                                            className={`full ${checkErr("lastname")}`}
                                            type="text"
                                            placeholder="Nom..."
                                            onChange={e => setUserDatas(datas => ({ ...datas, lastname: e.target.value }))}
                                            value={userDatas.lastname}
                                        />
                                        {error.element === "lastname" &&
                                            <ErrorCard
                                                display={error.element === "lastname"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Biographie</h3>
                            </div>
                            <div className="col-12 col-lg-9 lg:px-2">
                                <p className="txt-ter mb-1">Biographie</p>
                                <Textarea
                                    className={`w-full ${checkErr("bio")}`}
                                    type="text"
                                    placeholder="Biographie..."
                                    onChange={e => setUserDatas(datas => ({ ...datas, bio: e.target.value }))}
                                    value={userDatas.bio}
                                />
                                {error.element === "bio" &&
                                    <ErrorCard
                                        display={error.element === "bio"}
                                        text={error.error}
                                        clean={() => setError({ element: "", error: "" })}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Localisation</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-5 lg:px-2 relative">
                                        <p className="txt-ter mb-1">Ville</p>
                                        <ClassicInput
                                            className={`full ${checkErr("location")}`}
                                            type="text"
                                            placeholder="Rechercher une localité..."
                                            value={searchQuery}
                                            onInput={e => setSearchQuery(e.target.value)}
                                            onChange={searchLocation}
                                            cross
                                            onClean={() => {
                                                setUserDatas(datas => ({ ...datas, location: {} }))
                                                setSearchQuery("")
                                            }}
                                        />
                                        {error.element === "location" &&
                                            <ErrorCard
                                                display={error.element === "location"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }

                                        <div
                                            ref={wrapperRef}
                                            tabIndex="0"
                                            className="auto-complete-container full custom-scrollbar"
                                            style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }}
                                        >
                                            {locationsFound.length > 0 && display &&
                                                locationsFound.map((element, key) => {
                                                    return (
                                                        <div
                                                            className="auto-complete-item"
                                                            onClick={() => onSelect(element, `${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)}
                                                            key={key}
                                                        >
                                                            {`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {isLoading && locationsFound.length === 0 &&
                                                <Oval />
                                            }
                                            {searchQuery.length > 2 && locationsFound.length === 0 && !isLoading &&
                                                <div className="no-result">
                                                    <Icon name="BoxEmpty" />
                                                    <div>Aucun resultat ne correspond à votre recherche...</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Coordonnées</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Email</p>
                                        <div className="secured-email">
                                            <div className="flex items-center">
                                                <Icon name="Lock" className="w-4 h-4" />{user.email}
                                            </div>
                                            <TextButton>Modifier</TextButton>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Tél.</p>
                                        <ClassicInput
                                            className={`full ${checkErr("phone")}`}
                                            type="text"
                                            placeholder="Téléphone..."
                                            onChange={e => setUserDatas(datas => ({ ...datas, phone: e.target.value }))}
                                            value={userDatas.phone}
                                        />
                                        {error.element === "phone" &&
                                            <ErrorCard
                                                display={error.element === "phone"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-6">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Réseaux sociaux<br />et sites internet</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Réseaux sociaux et sites internet</p>
                                        <div className="flex">
                                            <ClassicInput
                                                className={`w-full !max-w-full mb-4 ${checkErr("networks")}`}
                                                inputClassName="w-full"
                                                type="text"
                                                placeholder="https://"
                                                value={network}
                                                onChange={e => setNetwork(e.target.value)}
                                            />
                                            <Button className="!h-[44px] ml-2" onClick={handleNetwork}>Ajouter</Button>
                                        </div>
                                        {error.element === "networks" &&
                                            <ErrorCard
                                                display={error.element === "networks"}
                                                text={error.error}
                                                clean={() => setError({ element: "", error: "" })}
                                            />
                                        }
                                        {userDatas.networks &&
                                            userDatas.networks.length > 0 &&
                                            userDatas.networks.map((element, key) => {
                                                return (
                                                    <div className="network" key={key}>
                                                        <div className="flex items-center w-[80%] relative">
                                                            {returnNetworkSVG(element.type)}
                                                            <a href={element.url} rel="noreferrer" target="_blank" className="ml-4">{element.url}</a>
                                                        </div>
                                                        <Icon name="Cross"
                                                            className='cursor-pointer'
                                                            onClick={() => setUserDatas(datas => ({
                                                                ...datas,
                                                                networks: deleteItemFromArray(userDatas.networks, key)
                                                            }))}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                } />
                <Route path="password" element={
                    <EditPassword
                        password={password}
                        setPassword={setPassword}
                        error={error}
                        setError={setError}
                        checkErr={checkErr}

                    />
                } />
            </Routes>
            <div id="back-actions">
                <div className='back-actions-inner'>
                    <TextButton>
                        <Link to="/profil/about">Annuler</Link>
                    </TextButton>
                    <Button className="ml-2" onClick={handleUpdate}>Enregistrer</Button>
                </div>
            </div>
        </>
    )
}

export default Edit