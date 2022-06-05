import React from 'react'
import { useOneLevelSearch } from '../../tools/hooks/useOneLevelSearch'
import { useCheckLocation } from '../functions/useCheckLocation'
import { MediumAvatar } from '../../tools/global/Avatars'
import { otherMembersIDs } from '../functions/function'
import { TextButton } from '../../tools/global/Button'
import { IconInput } from '../../tools/global/Inputs'
import { addNewMember } from '../functions/actions'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'
import { HiArrowSmLeft } from 'react-icons/hi'

const AddMembers = ({ user, websocket, friendsArr, conversation, setAddMembers, dispatch }) => {
    const membersToAdd = friendsArr.filter(f => !otherMembersIDs(conversation, user._id).includes(f._id))
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(membersToAdd, 'pseudo')
    const { isParam } = useCheckLocation()

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
                onChange={oneLevelSearch}
            />
            <div className="conversation-members custom-scrollbar">
                {membersToAdd.length > 0 ? (
                    membersToAdd.map((member, key) => {
                        return (
                            <div className={`${isInResults(member, "flex")} conversation-member`} key={key}>
                                <div className="flex items-center">
                                    <MediumAvatar pic={member.picture} />
                                    <div>{member.pseudo}</div>
                                </div>
                                <TextButton text="Ajouter" onClick={() => addNewMember(conversation, member, user, websocket, dispatch, isParam)} />
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