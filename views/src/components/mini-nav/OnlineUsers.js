import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import ToolsMenu from '../tools/global/ToolsMenu'
import { ToolsBtn } from '../tools/global/Button'
import { IconInput } from '../tools/global/Inputs'
import { useOnline } from '../tools/custom-hooks/useOnline'
import { useOneLevelSearch } from '../tools/custom-hooks/useOneLevelSearch.js'
import { useFetchContacts } from '../tools/custom-hooks/useFetchContacts.js'
import { addClass, fullImage } from '../Utils'

const OnlineUsers = ({ user, onlineUsers, open, setOpen }) => {
    const { contactsArr, fetchedContacts } = useFetchContacts(user)
    const { online, offline } = useOnline(contactsArr, onlineUsers)
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(online.concat(offline), 'pseudo')

    return (
        <div className={`online-users-menu custom-scrollbar ${addClass(open, 'open')}`}>
            <div className="online-users-header">
                <h2>Contacts</h2>
                <div className="flex">
                    <ToolsBtn onClick={() => setOpen('')}>
                        <Icon name="Cross" />
                    </ToolsBtn>
                </div>
            </div>
            <div className="search px-2 pb-2 mb-2">
                <IconInput
                    className="is_start_icon"
                    icon={<Icon name="Search" />}
                    placeholder="Rechercher un contact..."
                    value={search.query}
                    onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                    onChange={oneLevelSearch}
                />
                {search.state && search.results.length === 0 &&
                    <div className='pt-3 pb-1 text-center'>Aucun resultat</div>
                }
            </div>
            <div className="online-users-inner">
                {!fetchedContacts ? (
                    online.length > 0 || offline.length > 0 ? (
                        <>
                            {online.length > 0 &&
                                <>
                                    <div className="online-title">
                                        En ligne - <span>{online.length}</span>
                                    </div>
                                    {online.map((element, key) => {
                                        return (
                                            <div className={`online-users ${isElementInSearchResults(element, "block")}`} key={key}>
                                                <div className="online-user online">
                                                    <div className="online-user-img" style={fullImage(element.picture)}></div>
                                                    <div className="online-user-name">
                                                        <div className="online-user-pseudo">
                                                            {element.pseudo}
                                                        </div>
                                                        <div className="online-user-status">
                                                            <em>En ligne</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ToolsMenu mobile mobileFull>
                                                    <div className="tools_choice">
                                                        <Icon name="Reply" />
                                                        <Link to={"/" + element.pseudo}>Voir le profil</Link>
                                                    </div>
                                                </ToolsMenu>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                            {offline.length > 0 &&
                                <>
                                    <div className="online-title">
                                        Hors ligne - <span>{offline.length}</span>
                                    </div>
                                    {offline.map((element, key) => {
                                        return (
                                            <div className={`online-users ${isElementInSearchResults(element, "block")}`} key={key}>
                                                <div className="online-user offline">
                                                    <div className="online-user-img" style={fullImage(element.picture)}></div>
                                                    <div className="online-user-name">
                                                        <div className="online-user-pseudo">
                                                            {element.pseudo}
                                                        </div>
                                                        <div className="online-user-status">
                                                            <em>Déconnecté</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ToolsMenu mobile mobileFull>
                                                    <div className="tools_choice">
                                                        <Link to={`/user/${element.pseudo}`}>Voir le profil</Link>
                                                    </div><div className="tools_choice">
                                                        <Link to={`/user/${element.pseudo}/projects`}>Voir les project</Link>
                                                    </div>
                                                </ToolsMenu>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </>
                    ) : (
                        <div className="w-full py-5 text-center">
                            <p>Vous n'avez pas encore de<br />contact à afficher...</p>
                        </div>
                    )
                ) : (
                    <>
                        <div className="online-users">
                            <div className="online-user">
                                <div className="loading-circle-36 loading-skeleton"></div>
                                <div className="online-user-name">
                                    <div className={`loading-h14-w80 loading-skeleton`}></div>
                                    <div className={`loading-h12-w60 mt-2 pulse loading-skeleton`}></div>
                                </div>
                            </div>
                        </div>

                        <div className="online-users">
                            <div className="online-user">
                                <div className="loading-circle-36 loading-skeleton"></div>
                                <div className="online-user-name">
                                    <div className={`loading-h14-w120 loading-skeleton`}></div>
                                    <div className={`loading-h12-w80 mt-2 pulse loading-skeleton`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="online-users">
                            <div className="online-user">
                                <div className="loading-circle-36 loading-skeleton"></div>
                                <div className="online-user-name">
                                    <div className={`loading-h14-w140 loading-skeleton`}></div>
                                    <div className={`loading-h12-w60 mt-2 pulse loading-skeleton`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="online-users">
                            <div className="online-user">
                                <div className="loading-circle-36 loading-skeleton"></div>
                                <div className="online-user-name">
                                    <div className={`loading-h14-w80 loading-skeleton`}></div>
                                    <div className={`loading-h12-w120 mt-2 pulse loading-skeleton`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="online-users">
                            <div className="online-user">
                                <div className="loading-circle-36 loading-skeleton"></div>
                                <div className="online-user-name">
                                    <div className={`loading-h14-w140 loading-skeleton`}></div>
                                    <div className={`loading-h12-w60 mt-2 pulse loading-skeleton`}></div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default OnlineUsers;