import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessengerContext } from '../../AppContext'
import Icon from '../../tools/icons/Icon'
import Warning from '../../tools/global/Warning'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { MediumAvatar } from '../../tools/global/Avatars'
import { IconInput } from '../../tools/global/Inputs'
import { dateParser } from '../../Utils'
import { leaveConversation } from '../actions'
import { useOneLevelSearch } from '../../tools/custom-hooks/useOneLevelSearch'

const Members = ({ setAddMembers, conversation }) => {
    const { uid, websocket, dispatch } = useContext(MessengerContext)
    const { oneLevelSearch, isUserInSearchResults, search, setSearch } = useOneLevelSearch(conversation.files, 'name')
    const [warning, setWarning] = useState(-1)

    return (
        <div className="tools-displayer-content custom-scrollbar">
            <IconInput
                className="is_start_icon mb-2"
                placeholder="Rechercher un membre..."
                icon={<Icon name="Search" />}
                value={search.query}
                onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                onChange={oneLevelSearch}
            />
            <div className="add-more-users" onClick={() => setAddMembers(true)}>
                <Icon name="AddUser" /> Ajouter des personnes
            </div>
            <div className="conversation-members custom-scrollbar">
                {conversation.members.map((member, key) => {
                    return (
                        <div className={`${isUserInSearchResults(member, "flex")} conversation-member`} key={key}>
                            <div className="flex items-center">
                                <MediumAvatar pic={member.picture} />
                                <div>
                                    <div className="bold">
                                        {member.pseudo}
                                    </div>
                                    <div className="f-12 txt-sec">
                                        Membre depuis le {dateParser(member.date)}
                                    </div>
                                </div>
                            </div>

                            <ToolsMenu mobile mobileFull>
                                {member._id !== uid &&
                                    <div className="tools_choice">
                                        <Icon name="Message" /> Envoyer un message
                                    </div>
                                }
                                <div className="tools_choice">
                                    <Link to={"/" + member.pseudo}>
                                        <Icon name="Redo" /> Voir le profil
                                    </Link>
                                </div>
                                {conversation.owner._id === uid && member._id !== uid &&
                                    <div className="tools_choice red" onClick={() => setWarning(key)}>
                                        <Icon name="Trash" /> Supprimer
                                    </div>
                                }
                            </ToolsMenu>

                            <Warning
                                title={`Exclusion de ${member.pseudo}`}
                                text={`Voulez-vous vraiment exclure ${member.pseudo} de cette conversation ?`}
                                validateBtn={`Exclure ${member.pseudo}`}
                                className="delete"
                                open={warning === key}
                                setOpen={setWarning}
                                onValidate={() => leaveConversation(conversation, member._id, uid, websocket, dispatch)}
                                onClose={() => setWarning(false)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Members