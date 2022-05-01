import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import Oval from 'react-loading-icons/dist/components/oval'
import { Link } from 'react-router-dom'
import { IconInput } from '../tools/components/Inputs'
import { SmallLoader } from '../tools/components/Loader'
import ToolsMenu from '../tools/components/ToolsMenu'
import { coverPicture } from '../tools/functions/useAvatar'
import { dateParser } from '../Utils'

const Friends = ({ user }) => {
    const [friends, setFriends] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isResults, setResults] = useState([])
    const isEmpty = !isResults || isResults.length === 0
    const regexp = new RegExp(searchQuery, 'i')
    const searchProject = () => {
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
        <div className="content_box contacts_page">
            <div className="search_header">
                <h1>Contacts</h1>
                <IconInput className="is_start_icon" icon={<BiSearchAlt />} placeholder="Rechercher un contact..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchProject} cross clean={() => setSearchQuery("")} />
            </div>
            <div className="contacts_page-body">
                {!isLoading ? (
                    friends.map((element, key) => {
                        return (
                            <div className="card contact_card" key={key} style={{ display: search ? (isResults.includes(element) ? "flex" : "none") : "flex" }}>
                                <div className="contact_card-left" style={coverPicture(element.picture)}></div>
                                <div className="contact_card-right">
                                    <div className="card-infos">
                                        <Link to={"/" + element.pseudo} className="pseudo">{element.pseudo}</Link>
                                        <p>depuis le {dateParser(since(element))}</p>
                                        <p>{element.created_projects.length} projects crées • {element.current_projects.length} projects en cours</p>
                                    </div>
                                    <ToolsMenu>
                                        <div className="tools_choice">Voir le profil</div>
                                        <div className="tools_choice">Contacter</div>
                                        <div className="tools_choice">Inviter à rejoindre un projet</div>
                                        <div className="tools_choice">Supprimer des contacts</div>
                                    </ToolsMenu>
                                </div>
                            </div>
                        )
                    })
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