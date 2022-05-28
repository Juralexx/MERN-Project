import React, { useState } from 'react'
import { MediumAvatar } from '../../tools/components/Avatars'
import { isInResults } from '../../tools/functions/member'
import { oneLevelSearch } from '../../tools/functions/searches'
import { addNewMember, otherMembersIDs } from '../tools/function'
import { TextButton } from '../../tools/components/Button'
import { IconInput } from '../../tools/components/Inputs'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'
import { HiArrowSmLeft } from 'react-icons/hi'

const AddMembers = ({ user, websocket, friendsArr, conversation, setAddMembers, dispatch }) => {
    const membersToAdd = friendsArr.filter(f => !otherMembersIDs(conversation, user._id).includes(f._id))
    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    return (
        <>
            <div className="go-back">
                <HiArrowSmLeft onClick={() => setAddMembers(false)}/>
                <p>Ajouter des membres</p>
            </div>
            <IconInput
                className="full is_start_icon small mb-3"
                placeholder="Rechercher un membre..."
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={() => oneLevelSearch(query, membersToAdd, 'pseudo', isResults, setResults, setSearch)}
            />
            <div className="conversation-members custom-scrollbar">
                {membersToAdd.length > 0 ? (
                    membersToAdd.map((member, key) => {
                        return (
                            <div className={`${isInResults(member, isResults, search, "flex")} conversation-member`} key={key}>
                                <div className="flex items-center">
                                    <MediumAvatar pic={member.picture} />
                                    <div>{member.pseudo}</div>
                                </div>
                                <TextButton text="Ajouter" onClick={() => addNewMember(conversation, member, user, websocket, dispatch)} />
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-array">
                        <div><BiUserPlus /></div>
                        <div>Tous vos contact font déjà parti de cette conversation</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AddMembers