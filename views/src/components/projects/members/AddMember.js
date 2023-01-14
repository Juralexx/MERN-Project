import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Modal from '../../tools/global/Modal'
import { ClassicInput } from '../../tools/global/Inputs'
import { Button } from '../../tools/global/Button'
import Icon from '../../tools/icons/Icon';
import Oval from '../../tools/loaders/Oval'
import { MediumAvatar, TinyAvatar } from '../../tools/global/Avatars'
import { isUserInSearchResults, isSelected, sendProjectMemberRequest } from '../../tools/functions/member';
import { addMemberToArray, removeMemberFromArray } from '../../tools/functions/member';
import { removeAccents } from '../../Utils';
import { useFetchUsers } from '../../tools/custom-hooks/useFetchUsers';

const AddMember = ({ open, setOpen, project, user, websocket }) => {
    const [contacts, setContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    const [isLoading, setLoading] = useState(true)

    const { usersArr, fetchedUsers } = useFetchUsers(user.friends)
    const dispatch = useDispatch()

    useEffect(() => {
        if (usersArr.length > 0) {
            let removeAlreadyMembers = usersArr.filter(u => !project.members.some(member => member._id === u._id))
            setContacts(removeAlreadyMembers)
        }
        if (fetchedUsers) setLoading(false)
    }, [usersArr, fetchedUsers])

    /**
     * Search function
     */

    const [search, setSearch] = useState({
        state: false,
        query: "",
        results: []
    })
    const regexp = new RegExp(search.query, 'i')

    const searchContact = () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const response = contacts.filter(member => regexp.test(removeAccents(member.pseudo)))
            setSearch(data => ({ ...data, state: true, results: response }))
            console.log(response)
            if (!search.results || search.results.length === 0)
                setSearch(data => ({ ...data, state: false }))
        } else setSearch(data => ({ ...data, state: false }))
    }

    /**
     * 
     */

    return (
        <Modal open={open} setOpen={setOpen} className="add-members-modal">
            <h2>Nouveaux membres</h2>
            <div className="user_in_array-container">
                {selectedContacts.length > 0 && (
                    selectedContacts.map((element, key) => {
                        return (
                            <div className="user_in_array" key={key}>
                                <TinyAvatar pic={element.picture} />
                                <p>{element.pseudo}</p>
                                <Icon name="Cross" onClick={() => setSelectedContacts(removeMemberFromArray(element, selectedContacts))} />
                            </div>
                        )
                    })
                )}
            </div>
            <ClassicInput
                placeholder="Rechercher..."
                className="full mb-3"
                value={search.query}
                onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                onChange={searchContact}
                type="search"
                cross
                onClean={() => setSearch(data => ({ ...data, state: false, query: "" }))}
            />
            <div className="user_selecter">
                {contacts.length > 0 ? (
                    !isLoading ? (
                        <div className="user_displayer">
                            {contacts.map((element, key) => {
                                return (
                                    <div
                                        className={`user_display_choice ${isUserInSearchResults(element, search.results, search.state, "flex")} ${isSelected(selectedContacts, element)}`}
                                        key={key}
                                        onClick={() => setSelectedContacts(addMemberToArray(element, user, selectedContacts))}
                                    >
                                        <MediumAvatar pic={element.picture} />
                                        <div>
                                            <p>{element.pseudo}</p>
                                            <p>{element?.work}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <Oval />
                    )
                ) : (
                    <p>Vous n'avez pas de contact a ajouter à ce projet</p>
                )}
            </div>
            <Button
                className="mt-5 w-full"
                disabled={selectedContacts.length === 0}
                onClick={() => {
                    sendProjectMemberRequest(selectedContacts, user, project, websocket, dispatch)
                    setSelectedContacts([])
                    setOpen(false)
                }}
            >
                Ajouter
            </Button>
        </Modal>
    )
}

export default AddMember