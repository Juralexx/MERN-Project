import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { MessengerContext } from '../AppContext';
import Icon from '../tools/icons/Icon';
import ToolsMenu from '../tools/global/ToolsMenu';
import GroupTools from './conversation-tools/GroupTools';
import OnlineMembers from './OnlineMembers';
import DialogTools from './conversation-tools/DialogTools';
import { OnlineUserLoader } from './tools/Loaders';
import { IconInput } from '../tools/global/Inputs';
import { ToolsBtn } from '../tools/global/Button';
import { isAlreadyConversationExisting } from './functions';
import { addClass, fullImage } from '../Utils';
import { useOneLevelSearch } from '../tools/custom-hooks/useOneLevelSearch';
import { useOnline } from '../tools/custom-hooks/useOnline';

const ConversationTools = ({ onlineUsers, fetchedContacts, members, rightbar, setRightbar }) => {
    const { user, contactsArr, conversations, setConversations, changeCurrentChat, navigate } = useContext(MessengerContext)
    const { online, offline } = useOnline(contactsArr, onlineUsers)
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(online.concat(offline), 'pseudo')

    const handleClick = (receiver) => {
        let alreadyConversationExisting = isAlreadyConversationExisting(conversations.allConversations, [receiver, user])
        if (alreadyConversationExisting !== false) {
            changeCurrentChat(alreadyConversationExisting)
            navigate('/messenger/' + alreadyConversationExisting._id)
        } else {
            const conversation = {
                temporary: true,
                type: 'dialog',
                members: [{
                    _id: receiver._id,
                    pseudo: receiver.pseudo,
                    picture: receiver.picture
                }],
                owner: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture
                },
                creator: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture
                },
                messages: [],
                createdAt: new Date().toISOString()
            }
            navigate('/messenger/new')
            setConversations(convs => ({
                ...convs,
                currentChat: conversation,
                temporaryConversation: conversation
            }))
        }
    }

    return (
        <div className={`conversation-tools custom-scrollbar ${addClass(rightbar.state !== 'open', "closed")}`}>
            {rightbar.displayed === 'contacts' &&
                <>
                    <div className="conversation-tools-header">
                        <h2>Contacts</h2>
                        <div className="flex">
                            <ToolsBtn onClick={() => setRightbar({ open: false, displayed: "contacts" })}>
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
                    <div className="conversation-tools-inner">
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
                                                            <div className="tools_choice" onClick={() => handleClick(element)}>
                                                                <Icon name="Message" />Envoyer un message
                                                            </div>
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
                                                            <div className="tools_choice" onClick={() => handleClick(element)}>
                                                                <Icon name="Message" />Envoyer un message
                                                            </div>
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
                                </>
                            ) : (
                                <div className="no-conversation-yet !mt-10">
                                    <p>Aucun contact à afficher...</p>
                                </div>
                            )
                        ) : (
                            <OnlineUserLoader />
                        )}
                    </div>
                </>
            }

            {rightbar.displayed === 'members' &&
                <OnlineMembers
                    onlineUsers={onlineUsers}
                    members={members}
                    setRightbar={setRightbar}
                    handleClick={handleClick}
                />
            }

            {rightbar.displayed === 'tools' && (
                conversations.currentChat.type === 'group' ? (
                    <GroupTools
                        members={members}
                        open={rightbar.displayed === 'tools'}
                        setOpen={setRightbar}
                    />
                ) : (
                    <DialogTools
                        members={members}
                        open={rightbar.displayed === 'tools'}
                        setOpen={setRightbar}
                    />
                )
            )}
        </div>
    )
}

export default ConversationTools;