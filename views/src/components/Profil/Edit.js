import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import { returnNetworkSVG } from '../tools/functions/networks';
import { onlyLettersSpacesAndDashes } from '../Utils';
import { updateUser } from '../../actions/user.action';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { TextButton, Button } from '../tools/global/Button';
import { ErrorCard } from '../tools/global/Error';
import { ClassicInput, Textarea } from '../tools/global/Inputs';
import { SmallLoader } from '../tools/global/Loader';
import { BsInboxFill } from 'react-icons/bs';
import { MdLockOutline } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import EditPassword from './EditPassword';

const Edit = ({ user }) => {
    const [name, setName] = useState(user.name)
    const [lastname, setLastname] = useState(user.lastname)
    const [work, setWork] = useState(user.work)
    const [bio, setBio] = useState(user.bio)
    const [phone, setPhone] = useState(user.phone)
    const [networks, setNetworks] = useState(user.networks)
    const [password, setPassword] = useState(user.password)
    const [newPassword, setNewPassword] = useState()
    const [confirmedNewPassword, setConfirmedNewPassword] = useState()
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const checkErr = (name) => { if (isErr === name) return "err" }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name)
            setLastname(user.lastname)
            setWork(user.work)
            setBio(user.bio)
            setPhone(user.phone)
            setNetworks(user.networks)
        }
    }, [user])

    const [location, setLocation] = useState(user.location?.COM_NOM)
    const [searchQuery, setSearchQuery] = useState(user.location?.COM_NOM || "")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setDisplay, false, setLoading, false)

    const setSelect = (object, value) => { setSearchQuery(value); setLocation(object); setDisplay(false); setLoading(false) }

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        else {
            const response = await axios.get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${searchQuery}`)).catch((err) => { console.log("Error: ", err) })
            if (response) {
                setLocationsFound(response.data)
                if (searchQuery.length > 2) {
                    setResponse(true)
                    setDisplay(true)
                    setLoading(true)
                    if (isEmpty) {
                        setResponse(false)
                        setLoading(false)
                    }
                } else {
                    setDisplay(false)
                    setLoading(false)
                }
            }
        }
    }

    const clean = () => {
        setLocation({})
        setSearchQuery("")
    }

    const [network, setNetwork] = useState("")

    const handleNetwork = () => {
        if (isURL(network)) {
            let site = ""
            if (network.includes("facebook")) site = "facebook"
            else if (network.includes("instagram")) site = "instagram"
            else if (network.includes("twitter")) site = "twitter"
            else if (network.includes("snapchat")) site = "snapchat"
            else if (network.includes("youtube")) site = "youtube"
            else if (network.includes("twitch")) site = "twitch"
            else if (network.includes("pinterest")) site = "pinterest"
            else if (network.includes("linkedin")) site = "linkedin"
            else site = "website"
            setNetworks([...networks, { type: site, url: network }])
            setNetwork("")
            setErr('')
        } else {
            setErr("networks")
            setError("Veuillez saisir une adresse URL valide")
        }
    }

    const deleteItem = (key) => {
        let arr = [...networks]
        arr.splice(key, 1)
        setNetworks(arr)
    }

    const handleUpdate = async () => {
        if (name.length > 0 && !onlyLettersSpacesAndDashes(name)) {
            setErr("name")
            setError("Veuillez saisir un prénom valide")
        } else if (lastname.length > 0 && !onlyLettersSpacesAndDashes(lastname)) {
            setErr("lastname")
            setError("Veuillez saisir un nom valide")
        } else if (work.length > 0 && !onlyLettersSpacesAndDashes(work)) {
            setErr("work")
            setError("Veuillez saisir un métier valide")
        } else if (phone.length > 0 && !isMobilePhone(phone)) {
            setErr("phone")
            setError("Veuillez saisir un numéro de téléphone valide")
        } else {
            if (Object.keys(location).length === 0)
                setLocation({})

            dispatch(updateUser(user._id, name, lastname, work, bio, location, phone, networks))
                .then(() =>
                    setTimeout(navigate(`/profil/about`), 2000)
                ).catch(err => console.log(err))
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
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Pseudo</p>
                                        <div className="flex items-center"><MdLockOutline className="mr-1" />{user.pseudo}</div>
                                    </div>
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Métier</p>
                                        <ClassicInput className={`full ${checkErr("work")}`} type="text" placeholder="Métier..." onChange={e => setWork(e.target.value)} value={work} />
                                        {isErr === "work" && <ErrorCard display={isErr === "work"} text={error} clean={() => setErr("")} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Prénom</p>
                                        <ClassicInput className={`full ${checkErr("name")}`} type="text" placeholder="Prénom..." onChange={e => setName(e.target.value)} value={name} />
                                        {isErr === "name" && <ErrorCard display={isErr === "name"} text={error} clean={() => setErr("")} />}

                                    </div>
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Nom</p>
                                        <ClassicInput className={`full ${checkErr("lastname")}`} type="text" placeholder="Nom..." onChange={e => setLastname(e.target.value)} value={lastname} />
                                        {isErr === "lastname" && <ErrorCard display={isErr === "lastname"} text={error} clean={() => setErr("")} />}

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
                                <Textarea className={`full ${checkErr("bio")}`} type="text" placeholder="Biographie..." onChange={e => setBio(e.target.value)} value={bio} />
                                {isErr === "bio" && <ErrorCard display={isErr === "bio"} text={error} clean={() => setErr("")} />}
                            </div>
                        </div>
                        <div className="row py-6 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Localisation</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col col-lg-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Ville</p>
                                        <ClassicInput className={`full ${checkErr("location")}`} type="text" placeholder="Rechercher une localité..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchLocation} cross onClean={clean} />
                                        {isErr === "location" && <ErrorCard display={isErr === "location"} text={error} clean={() => setErr("")} />}

                                        <div tabIndex="0" className="auto-complete-container full custom-scrollbar" ref={wrapperRef} style={{ display: searchQuery.length < 3 || !display ? "none" : "block" }} >
                                            {!isEmpty && display && isResponse &&
                                                locationsFound.map((element, key) => {
                                                    return (
                                                        <div className="auto-complete-item" onClick={() => setSelect(element, `${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`)} key={key}>
                                                            {`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {isLoading && isEmpty &&
                                                <SmallLoader />
                                            }
                                            {searchQuery.length > 2 && isEmpty && !isLoading &&
                                                <div className="no-result">
                                                    <div><BsInboxFill /></div>
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
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Email</p>
                                        <div className="secured-email">
                                            <div className="flex items-center"><MdLockOutline />{user.email}</div>
                                            <TextButton text="Modifier" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Tél.</p>
                                        <ClassicInput className={`full ${checkErr("phone")}`} type="text" placeholder="Téléphone..." onChange={e => setPhone(e.target.value)} value={phone} />
                                        {isErr === "phone" && <ErrorCard display={isErr === "phone"} text={error} clean={() => setErr("")} />}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-6">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Réseaux sociaux et sites internet</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Réseaux sociaux et sites internet</p>
                                        <div className="flex">
                                            <ClassicInput className={`w-full !max-w-full mb-4 ${checkErr("networks")}`} inputClassName="w-full" type="text" placeholder="https://" value={network} onChange={e => setNetwork(e.target.value)} />
                                            <Button className="!h-[46px] ml-2" text="Ajouter" onClick={handleNetwork} />
                                        </div>
                                        {isErr === "networks" && <ErrorCard display={isErr === "networks"} text={error} clean={() => setErr("")} />}
                                        {networks && networks.length > 0 &&
                                            networks.map((element, key) => {
                                                return (
                                                    <div className="network" key={key}>
                                                        <div className="flex items-center w-[80%] relative">
                                                            {returnNetworkSVG(element.type)}
                                                            <a href={element.url} rel="noreferrer" target="_blank" className="ml-4">{element.url}</a>
                                                        </div>
                                                        <IoClose className='cursor-pointer' onClick={() => deleteItem(key)} />
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
                        user={user}
                        password={password}
                        setPassword={setPassword}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        confirmedNewPassword={confirmedNewPassword}
                        setConfirmedNewPassword={setConfirmedNewPassword}
                        isErr={isErr}
                        setErr={setErr}
                        error={error}
                        checkErr={checkErr}

                    />
                } />
            </Routes>
            <div id="back-actions">
                <Link className="no-decoration" to="/profil/about"><TextButton text="Annuler" /></Link>
                <Button text="Enregistrer" onClick={handleUpdate} />
            </div>
        </>
    )
}

export default Edit