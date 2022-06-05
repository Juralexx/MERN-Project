import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCheckLocation } from '../functions/useCheckLocation'
import { MediumAvatar } from '../../tools/global/Avatars'
import { dateParser } from '../../Utils'
import { IconInput } from '../../tools/global/Inputs'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { leaveConversation } from '../functions/actions'
import { useOneLevelSearch } from '../../tools/hooks/useOneLevelSearch'
import { MdOutlineMessage } from 'react-icons/md'
import { IoArrowRedo, IoTrashBin } from 'react-icons/io5'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'
import Warning from '../../tools/global/Warning'

const Members = ({ uid, websocket, members, setAddMembers, conversation, dispatch }) => {
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(conversation.files, 'name')
    const { isParam } = useCheckLocation()
    const [warning, setWarning] = useState(-1)

    return (
        <div className="tools-displayer-content">
            <IconInput
                className="full is_start_icon small mb-2"
                placeholder="Rechercher un membre..."
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={oneLevelSearch}
            />
            <div className="add-more-users" onClick={() => setAddMembers(true)}>
                <BiUserPlus />
                <p>Ajouter des personnes</p>
            </div>
            <div className="conversation-members custom-scrollbar">
                {conversation.members.map((member, key) => {
                    return (
                        <div key={key}>
                            <div className={`${isInResults(member, "flex")} conversation-member`}>
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
                                        <div className="tools_choice red" onClick={() => setWarning(key)}><IoTrashBin />Supprimer</div>
                                    }
                                </ToolsMenu>
                            </div>

                            <Warning
                                title={`Exclusion de ${member.pseudo}`}
                                text={`Voulez-vous vraiment exclure ${member.pseudo} de cette conversation ?`}
                                validateBtn={`Exclure ${member.pseudo}`}
                                className="delete"
                                open={warning === key}
                                setOpen={setWarning}
                                onValidate={() => leaveConversation(conversation, member._id, uid, websocket, dispatch, isParam)}
                                onClose={() => setWarning(false)}
                            >
                            </Warning>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Members