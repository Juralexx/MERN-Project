import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MediumAvatar } from '../../tools/components/Avatars'
import { isInResults } from '../../tools/functions/member'
import { oneLevelSearch } from '../../tools/functions/searches'
import { leaveConversation } from '../functions/function'
import { dateParser } from '../../Utils'
import { IconInput } from '../../tools/components/Inputs'
import ToolsMenu from '../../tools/components/ToolsMenu'
import { MdOutlineMessage } from 'react-icons/md'
import { IoArrowRedo, IoTrashBin } from 'react-icons/io5'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'

const Members = ({ uid, websocket, members, setAddMembers, conversation, dispatch }) => {
    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    return (
        <div className="tools-displayer-content">
            <IconInput
                className="full is_start_icon small mb-2"
                placeholder="Rechercher un membre..."
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={() => oneLevelSearch(query, members, 'pseudo', isResults, setResults, setSearch)}
            />
            <div className="add-more-users" onClick={() => setAddMembers(true)}>
                <BiUserPlus />
                <p>Ajouter des personnes</p>
            </div>
            <div className="conversation-members custom-scrollbar">
                {conversation.members.map((member, key) => {
                    return (
                        <div className={`${isInResults(member, isResults, search, "flex")} conversation-member`} key={key}>
                            <div className="flex items-center">
                                <MediumAvatar pic={member.picture} />
                                <div>
                                    <div className="bold">{member.pseudo}</div>
                                    <div className="f-12 txt-sec">Membre depuis le {dateParser(member.date)}</div>
                                </div>

                            </div>
                            <ToolsMenu>
                                {member._id !== uid &&
                                    <div className="tools_choice"><MdOutlineMessage />Envoyer un message</div>
                                }
                                <div className="tools_choice"><IoArrowRedo /><Link to={"/" + member.pseudo}>Voir le profil</Link></div>
                                {conversation.owner._id === uid && member._id !== uid &&
                                    <div className="tools_choice red" onClick={() => leaveConversation(conversation, member._id, uid, websocket, dispatch)}><IoTrashBin />Supprimer</div>
                                }
                            </ToolsMenu>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Members