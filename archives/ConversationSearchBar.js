import axios from 'axios';
import React, { useState } from 'react';
import ThreeDots from 'react-loading-icons/dist/components/three-dots';

const ConversationSearchBar = ({ conversations, changeCurrentChat }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [conversation, setConversation] = useState()
    const [conversationsFound, setConversationsFound] = useState([])
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !conversationsFound || conversationsFound.length === 0

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
        setConversation(searchQuery)
    }

    const searchLocation = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const regexp = new RegExp(searchQuery, 'i');
        const response = conversations.filter(properties => regexp.test(properties.name))

        if (searchQuery.length >= 2) {
            console.log(response)
            setConversationsFound(response)
            setDisplay(true)
            // setResponse(true)
            if (conversationsFound.length === 0) {
                // setResponse(false)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <>
            <input placeholder="Rechercher une conversation..." className="conversation-menu-input" value={searchQuery} onInput={handleInputChange} onChange={searchLocation} type="search" />
            {!isEmpty && display && (
                <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                    {conversationsFound.map((element, key) => {
                        const chat = element
                        const name = element.name

                        return (
                            <li onClick={(e) => { changeCurrentChat(chat); setSelect(name)}} key={key}>{name}</li>
                        )
                    })}
                </ul>
            )}
            {isLoading && !display && (
                <div className="load-container">
                    <ThreeDots />
                </div>
            )}
            {/* { !isLoading && (
                <div className="load-container">
                    <p>Aucun resultat ne correspond à votre recherche</p>
                </div>
            )} */}
        </>
    );
};

export default ConversationSearchBar;
