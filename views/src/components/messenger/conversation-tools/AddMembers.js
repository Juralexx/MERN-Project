import React, { useContext } from 'react'
import { MessengerContext } from '../../AppContext'
import { useOneLevelSearch } from '../../tools/hooks/useOneLevelSearch'
import { useCheckLocation } from '../functions/useCheckLocation'
import { MediumAvatar } from '../../tools/global/Avatars'
import { otherMembersIDs } from '../functions/function'
import { TextButton } from '../../tools/global/Button'
import { IconInput } from '../../tools/global/Inputs'
import { addNewMember } from '../functions/actions'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'
import { HiArrowSmLeft } from 'react-icons/hi'

const AddMembers = ({ conversation, setAddMembers }) => {
    const { user, websocket, friendsArr, dispatch } = useContext(MessengerContext)
    const membersToAdd = friendsArr.filter(f => !otherMembersIDs(conversation, user._id).includes(f._id))
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(membersToAdd, 'pseudo')
    const { isParam } = useCheckLocation()

    return (
        <>
            <div className="go-back ml-3 mb-3">
                <HiArrowSmLeft onClick={() => setAddMembers(false)} />
                <p>Ajouter des membres</p>
            </div>
            <div className="px-[10px]">
                <IconInput
                    className="full is_start_icon small mb-3"
                    placeholder="Rechercher un membre..."
                    icon={<BiSearchAlt />}
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={oneLevelSearch}
                />
            </div>
            <div className="conversation-members custom-scrollbar">
                {membersToAdd.length > 0 ? (
                    membersToAdd.map((member, key) => {
                        return (
                            <div className={`${isInResults(member, "flex")} conversation-member !px-3`} key={key}>
                                <div className="flex items-center">
                                    <MediumAvatar pic={member.picture} />
                                    <div>{member.pseudo}</div>
                                </div>
                                <TextButton onClick={() => addNewMember(conversation, member, user, websocket, dispatch, isParam)}>Ajouter</TextButton>
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