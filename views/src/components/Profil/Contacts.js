import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IconInput } from '../tools/global/Inputs'
import Oval from '../tools/loaders/Oval'
import ToolsMenu from '../tools/global/ToolsMenu'
import Warning from '../tools/global/Warning'
import { removeContact } from '../tools/functions/contact'
import { dateParser, fullImage } from '../Utils'
import Icon from '../tools/icons/Icon'
import { useFetchContacts } from '../tools/custom-hooks/useFetchContacts'

const Contacts = ({ user, websocket }) => {
    const { contactsArr, fetchedContacts } = useFetchContacts(user)
    const [warning, setWarning] = useState(-1)
    const dispatch = useDispatch()

    const [search, setSearch] = useState({ state: false, query: "", results: [] })
    const regexp = new RegExp(search.query, 'i')

    const searchContacts = () => {
        if (!search.query || search.query.trim() === "") { return }
        if (search.query.length > 2) {
            const response = contactsArr.filter(f => regexp.test(f.pseudo))
            setSearch(content => ({ ...content, state: true, results: response }))
            if (!search.results || search.results.length === 0)
                setSearch(content => ({ ...content, state: false }))
        } else setSearch(content => ({ ...content, state: false }))
    }

    const since = (element) => {
        let contact = user.contacts.find(e => e._id === element._id)
        return contact?.requestedAt
    }

    return (
        <div className="profil-page col-12 col-lg-9 relative lg:!pl-7">
            <div className='search-header'>
                <h2>Contacts <span>{user?.contacts?.length}</span></h2>
                <IconInput
                    className="is_start_icon md:max-w-[350px] mt-2 md:mt-0"
                    icon={<Icon name="Search" />}
                    placeholder="Rechercher un contact..."
                    value={search.query}
                    onInput={e => setSearch(content => ({ ...content, query: e.target.value }))}
                    onChange={searchContacts}
                    cross
                    onClean={() => setSearch(content => ({ ...content, query: "" }))}
                />
            </div>
            <div className="profil-page_body">
                {!fetchedContacts ? (
                    contactsArr.length > 0 ? (
                        <div className="profil-page_contacts">
                            {contactsArr.map((element, key) => {
                                return (
                                    <div
                                        className="contact_card"
                                        key={key}
                                        style={{ display: search.state ? (search.results.includes(element) ? "flex" : "none") : "flex" }}
                                    >
                                        <div className="contact_card-left" style={fullImage(element.picture)}></div>
                                        <div className="contact_card-right">
                                            <div className="card-infos">
                                                <Link to={"/" + element.pseudo} className="pseudo">{element.pseudo}</Link>
                                                <p>depuis le {dateParser(since(element))}</p>
                                                <p>{element.created_projects.length} projects crées • {element.projects.length} projects en cours</p>
                                            </div>
                                            <ToolsMenu>
                                                <Link className="tools_choice" to={"/" + element.pseudo}>
                                                    <Icon name="External" /> Voir le profil
                                                </Link>
                                                <div className="tools_choice">
                                                    <Icon name="Chat" />Envoyer un message
                                                </div>
                                                <div className="tools_choice">
                                                    <Icon name="Group" />Inviter à rejoindre un projet
                                                </div>
                                                <div className="tools_choice red" onClick={() => setWarning(key)}>
                                                    <Icon name="Trash" />Supprimer des contacts
                                                </div>
                                            </ToolsMenu>
                                            <Warning
                                                open={warning === key}
                                                setOpen={setWarning}
                                                title={`Etes-vous sur de vouloir supprimer ${element.pseudo} de vos contacts ?`}
                                                text={`${element.pseudo} sera définitivement supprimé de vos contacts ?`}
                                                onValidate={() => {
                                                    removeContact(user._id, element._id, websocket, dispatch)
                                                    setWarning(false)
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="empty-content">
                            <img src={`${process.env.REACT_APP_API_URL}files/img/logo.png`} alt="Vous n'avez aucun contact à afficher..." />
                            <p>Vous n'avez aucun contact à afficher...</p>
                        </div>
                    )
                ) : (
                    <div className="loading-container">
                        <Oval />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contacts