import React, { useState } from 'react'
import { MediumAvatar } from '../../tools/components/Avatars'
import { isInResults } from '../../tools/functions/member'
import { oneLevelSearch } from '../../tools/functions/searches'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'
import { addNewMember, leaveConversation, otherMembersIDs } from '../tools/function'
import { TextButton } from '../../tools/components/Button'
import { Button } from 'react-day-picker'
import { dateParser } from '../../Utils'
import { IconInput } from '../../tools/components/Inputs'

const Members = ({ uid, websocket, members, friendsArr, conversation, dispatch }) => {
    const [addMember, setAddMember] = useState(false)
    const membersToAdd = friendsArr.filter(f => !otherMembersIDs(conversation, uid).includes(f._id))

    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    return (
        <>
            <IconInput
                className="full is_start_icon small mb-3"
                placeholder="Rechercher un membre..."
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={() => oneLevelSearch(query, members, 'pseudo', isResults, setResults, setSearch)}
            />
            {!addMember && (
                <>
                    <div className="add-more-users" onClick={() => setAddMember(!addMember)}>
                        <BiUserPlus />
                        <p>Ajouter des personnes</p>
                    </div>
                    <div className="conversation-members">
                        {conversation.members.map((member, key) => {
                            return (
                                <div className={`${isInResults(member, isResults, search, "flex")} justify-between py-2`} key={key}>
                                    <div className="flex items-center">
                                        <MediumAvatar pic={member.picture} />
                                        <div>
                                            <div className="bold">{member.pseudo}</div>
                                            <div className="f-12 txt-sec">Membre depuis le {dateParser(member.date)}</div>
                                        </div>

                                    </div>
                                    {conversation.owner._id === uid && member._id !== uid &&
                                        <TextButton text="Supprimer" onClick={() => leaveConversation(conversation, member._id, uid, websocket, dispatch)} />
                                    }
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
            {addMember &&
                <div className="conversation-members">
                    {membersToAdd.length > 0 ? (
                        membersToAdd.map((member, key) => {
                            return (
                                <div className={`${isInResults(member, isResults, search, "flex")} justify-between py-2`} key={key}>
                                    <div className="flex items-center">
                                        <MediumAvatar pic={member.picture} />
                                        <div>{member.pseudo}</div>
                                    </div>
                                    <TextButton text="Ajouter" onClick={() => addNewMember(conversation, member, uid, websocket, dispatch)} />
                                </div>
                            )
                        })
                    ) : (
                        <div className="empty-array">
                            <div><BiUserPlus /></div>
                            <div>Tous vos contact font déjà parti de cette conversation</div>
                        </div>
                    )}
                    <div className="conversation-btn_container">
                        <Button text="Terminé" onClick={() => setAddMember(!addMember)} />
                    </div>
                </div>
            }
        </>
    )
}

export default Members