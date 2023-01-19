import React, { useContext } from 'react'
import { MessengerContext } from '../../AppContext'
import { useOneLevelSearch } from '../../tools/custom-hooks/useOneLevelSearch'
import { MediumAvatar } from '../../tools/global/Avatars'
import { otherMembersIDs } from '../functions'
import { TextButton } from '../../tools/global/Button'
import { IconInput } from '../../tools/global/Inputs'
import { addNewMember } from '../actions'
import Icon from '../../tools/icons/Icon'

const AddMembers = ({ conversation, setAddMembers }) => {
    const { user, websocket, contactsArr, dispatch } = useContext(MessengerContext)
    const membersToAdd = contactsArr.filter(contact =>
        !otherMembersIDs(conversation, user._id).includes(contact._id)
    )
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(membersToAdd, 'pseudo')

    return (
        <>
            <div className="go-back mb-3">
                <Icon name="ArrowLeft" onClick={() => setAddMembers(false)} />
                <p>Ajouter des membres</p>
            </div>
            <IconInput
                className="full is_start_icon mb-3"
                placeholder="Rechercher un membre..."
                icon={<Icon name="Search" />}
                value={search.query}
                onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                onChange={oneLevelSearch}
            />
            <div className="conversation-members custom-scrollbar">
                {membersToAdd.length > 0 ? (
                    membersToAdd.map((member, key) => {
                        return (
                            <div className={`conversation-member ${isElementInSearchResults(member, 'flex')}`} key={key}>
                                <div className="flex items-center">
                                    <MediumAvatar pic={member.picture} />
                                    <div>{member.pseudo}</div>
                                </div>
                                <TextButton onClick={() => addNewMember(conversation, member, user, websocket, dispatch)}>
                                    Ajouter
                                </TextButton>
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-array">
                        <Icon name="AddUser" />
                        <div>Tous vos contact font déjà parti de cette conversation</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AddMembers