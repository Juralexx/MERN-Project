import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useClickOutside } from '../tools/hooks/useClickOutside';
import { returnNetworkSVG } from '../tools/functions/networks';
import { addClass, deleteItemFromArray, onlyLettersSpacesAndDashes } from '../Utils';
import { updateUser } from '../../reducers/user.action';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { TextButton, Button, StringButton } from '../tools/global/Button';
import { ErrorCard } from '../tools/global/ErrorCard';
import { ClassicInput, Textarea } from '../tools/global/Inputs';
import Oval from '../../components/tools/loaders/Oval'
import EditPassword from './EditPassword';
import Icon from '../tools/icons/Icon'

const Edit = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({ element: "", error: "" })

    const [userDatas, setUserDatas] = useState(user)
    const [password, setPassword] = useState({
        password: user.password,
        newPassword: "",
        confirmedNewPassword: "",
    })

    useEffect(() => {
        if (user) setUserDatas(user)
    }, [user])

    /**
     * 
     */

    const [search, setSearch] = useState({
        isSearching: false,
        query: user.location?.COM_NOM,
        results: [],
        isLoading: false
    })

    const searchLocation = async () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length > 2) {
            setSearch(data => ({ ...data, isSearching: true, isLoading: true }))

            let timer
            clearTimeout(timer)
            timer = setTimeout(async () => {
                const response = await axios
                    .get(encodeURI(`${process.env.REACT_APP_API_URL}api/location/${search.query}`))
                    .catch(err => console.log("Error: ", err))

                if (response.data.length > 0)
                    setSearch(data => ({ ...data, results: response.data, isLoading: false }))
                else
                    setSearch(data => ({ ...data, results: [], isLoading: false }))
            }, 1000)
        } else {
            setSearch(data => ({ ...data, isSearching: false, isLoading: false }))
        }
    }

    const wrapperRef = useRef()
    useClickOutside(wrapperRef, () => setSearch(data => ({ ...data, isSearching: false, results: [], isLoading: false })))

    /**
     * 
     */

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

    /**
     * 
     */

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

    /**
     * 
     */

    return (
        <>
            <div className="content_nav !my-4">
                <NavLink to="/profil/edit">Mon compte</NavLink>
                <NavLink to="password">Mot de passe</NavLink>
            </div>
            <Routes>
                <Route index element={
                    <>
                        <div className="row py-8 border-b">
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
                                            className={`full ${addClass(error.element === "work", 'err')}`}
                                            type="text"
                                            placeholder="Métier..."
                                            value={userDatas.work}
                                            onChange={e => setUserDatas(datas => ({ ...datas, work: e.target.value }))}
                                        />
                                        <ErrorCard
                                            display={error.element === "work"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-5 lg:mb-0 lg:px-2 sm:pr-2">
                                        <p className="txt-ter mb-1">Prénom</p>
                                        <ClassicInput
                                            className={`full ${addClass(error.element === "name", 'err')}`}
                                            type="text"
                                            placeholder="Prénom..."
                                            value={userDatas.name}
                                            onChange={e => setUserDatas(datas => ({ ...datas, name: e.target.value }))}
                                        />
                                        <ErrorCard
                                            display={error.element === "name"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 lg:px-2 sm:pl-2">
                                        <p className="txt-ter mb-1">Nom</p>
                                        <ClassicInput
                                            className={`full ${addClass(error.element === "lastname", 'err')}`}
                                            type="text"
                                            placeholder="Nom..."
                                            value={userDatas.lastname}
                                            onChange={e => setUserDatas(datas => ({ ...datas, lastname: e.target.value }))}
                                        />
                                        <ErrorCard
                                            display={error.element === "lastname"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-8 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Biographie</h3>
                            </div>
                            <div className="col-12 col-lg-9 lg:px-2">
                                <p className="txt-ter mb-1">Biographie</p>
                                <Textarea
                                    className={`w-full ${addClass(error.element === "bio", 'err')}`}
                                    type="text"
                                    placeholder="Biographie..."
                                    value={userDatas.bio}
                                    onChange={e => setUserDatas(datas => ({ ...datas, bio: e.target.value }))}
                                />
                                <ErrorCard
                                    display={error.element === "bio"}
                                    text={error.error}
                                    clean={() => setError({ element: "", error: "" })}
                                />
                            </div>
                        </div>
                        <div className="row py-8 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Localisation</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-6 lg:px-2 relative">
                                        <p className="txt-ter mb-1">Ville</p>
                                        <ClassicInput
                                            className={`full ${addClass(error.element === "location", 'err')}`}
                                            type="text"
                                            placeholder="Rechercher une localité..."
                                            value={search.query}
                                            onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                                            onChange={searchLocation}
                                            cross
                                            onClean={() => {
                                                setSearch(data => ({ ...data, query: '' }))
                                                setUserDatas(data => ({ ...data, location: {} }))
                                            }}
                                        />
                                        <ErrorCard
                                            display={error.element === "location"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />

                                        <div ref={wrapperRef}
                                            tabIndex="0"
                                            className="auto-complete-container full lg:max-w-[462px] custom-scrollbar"
                                            style={{ display: !search.isSearching ? "none" : "block" }}
                                        >
                                            {search.results.length > 0 &&
                                                search.results.map((element, key) => {
                                                    return (
                                                        <div
                                                            className="auto-complete-item"
                                                            key={key}
                                                            onClick={() => {
                                                                setSearch(data => ({ ...data, isSearching: false, query: `${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`, isLoading: false }))
                                                                setUserDatas(datas => ({ ...datas, location: element }))
                                                            }}>
                                                            {`${element.COM_NOM} - ${element.DEP_NOM_NUM}, ${element.REG_NOM_OLD}`}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {search.isLoading && search.results.length === 0 &&
                                                <div className="py-4">
                                                    <Oval />
                                                </div>
                                            }
                                            {search.isSearching && search.results.length === 0 && !search.isLoading &&
                                                <div className="no-result">
                                                    <div>Aucun résultat ne correspond à votre recherche...</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-8 border-b">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Coordonnées</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-5 lg:mb-0 lg:px-2">
                                        <p className="txt-ter mb-1">Email</p>
                                        <div className="secured-email">
                                            <div className="flex items-center">
                                                <Icon name="Lock" className="w-4 h-4" />{user.email}
                                            </div>
                                            <StringButton>Modifier</StringButton>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mb-5 lg:mb-0 lg:px-2">
                                        <p className="txt-ter mb-1">Tél.</p>
                                        <ClassicInput
                                            className={`full ${addClass(error.element === "phone", 'err')}`}
                                            type="text"
                                            placeholder="Téléphone..."
                                            value={userDatas.phone}
                                            onChange={e => setUserDatas(datas => ({ ...datas, phone: e.target.value }))}
                                        />
                                        <ErrorCard
                                            display={error.element === "phone"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-8">
                            <div className="col-12 col-lg-3 mb-5">
                                <h3 className="txt-ter">Réseaux sociaux<br />et sites internet</h3>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-5 lg:px-2">
                                        <p className="txt-ter mb-1">Réseaux sociaux et sites internet</p>
                                        <div className="flex">
                                            <ClassicInput
                                                className={`w-full !max-w-full mb-4 ${addClass(error.element === "networks", 'err')}`}
                                                inputClassName="w-full"
                                                type="text"
                                                placeholder="https://"
                                                value={network}
                                                onChange={e => setNetwork(e.target.value)}
                                            />
                                            <Button className="!h-[44px] ml-2" onClick={handleNetwork}>Ajouter</Button>
                                        </div>
                                        <ErrorCard
                                            display={error.element === "networks"}
                                            text={error.error}
                                            clean={() => setError({ element: "", error: "" })}
                                        />
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