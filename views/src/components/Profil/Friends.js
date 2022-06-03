import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IconInput } from '../tools/global/Inputs'
import { SmallLoader } from '../tools/global/Loader'
import ToolsMenu from '../tools/global/ToolsMenu'
import { coverPicture } from '../tools/hooks/useAvatar'
import { removeFriend } from '../tools/functions/friend'
import { dateParser } from '../Utils'
import { BiSearchAlt } from 'react-icons/bi'
import Warning from '../tools/global/Warning'

const Friends = ({ user, websocket }) => {
    const [friends, setFriends] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [warning, setWarning] = useState(-1)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isResults, setResults] = useState([])
    const isEmpty = !isResults || isResults.length === 0
    const regexp = new RegExp(searchQuery, 'i')
    const searchFriends = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length > 2) {
            const response = friends.filter(f => regexp.test(f.pseudo))
            setResults(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    useEffect(() => {
        if (user.friends) {
            const fetch = () => {
                const promises = user.friends.map(async e => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${e.friend}`)
                        .then(res => res.data)
                        .catch(err => console.log(err))
                })
                Promise.all(promises).then(res => {
                    setFriends(res)
                    setLoading(false)
                })
            }
            fetch()
        }
    }, [user.friends])

    const since = (element) => {
        const friend = user.friends.find(e => e.friend === element._id)
        return friend.requestedAt
    }

    return (
        <div className="profil_page col-12 col-lg-9 relative lg:!pl-7">
            <div className="search_header">
                <h2>Contacts <span>{user?.friends?.length}</span></h2>
                <IconInput className="is_start_icon" icon={<BiSearchAlt />} placeholder="Rechercher un contact..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchFriends} cross clean={() => setSearchQuery("")} />
            </div>
            <div className="profil_page-body">
                {!isLoading ? (
                    friends.length > 0 ? (
                        friends.map((element, key) => {
                            return (
                                <div className="card contact_card" key={key} style={{ display: search ? (isResults.includes(element) ? "flex" : "none") : "flex" }}>
                                    <div className="contact_card-left" style={coverPicture(element.picture)}></div>
                                    <div className="contact_card-right">
                                        <div className="card-infos">
                                            <Link to={"/" + element.pseudo} className="pseudo">{element.pseudo}</Link>
                                            <p>depuis le {dateParser(since(element))}</p>
                                            <p>{element.created_projects.length} projects crées • {element.projects.length} projects en cours</p>
                                        </div>
                                        <ToolsMenu>
                                            <div className="tools_choice" onClick={() => navigate("/" + element.pseudo)}>Voir le profil</div>
                                            <div className="tools_choice">Contacter</div>
                                            <div className="tools_choice">Inviter à rejoindre un projet</div>
                                            <div className="tools_choice" onClick={() => setWarning(key)}>Supprimer des contacts</div>
                                        </ToolsMenu>
                                        <Warning
                                            open={warning === key}
                                            setOpen={setWarning}
                                            title={`Etes-vous sur de vouloir supprimer ${element.pseudo} de vos contacts ?`}
                                            text={`${element.pseudo} sera définitivement supprimé de vos contacts ?`}
                                            onValidate={() => { removeFriend(user._id, element._id, websocket, dispatch); setWarning(false) }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="empty-content">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun contact à afficher..." />
                            <p>Vous n'avez aucun contact à afficher...</p>
                        </div>
                    )
                ) : (
                    <div className="loading-container">
                        <SmallLoader />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Friends