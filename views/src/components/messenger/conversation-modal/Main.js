import React from 'react'
import { dateParser } from '../../Utils'

const Main = ({ conversation }) => {

    return (
        <div className="tools-displayer-content custom-scrollbar">
            <div className="conversation-infos-bloc">
                <div className="w-full">
                    <div className="bold mb-2">Nom</div>
                    <div className="txt-sec">{conversation.name !== "" && conversation.name !== undefined ? conversation.name : 'Pas encore de nom'}</div>
                </div>
            </div>
            <div className="conversation-infos-bloc">
                <div className="w-full">
                    <div className="bold mb-1">Description</div>
                    <div className="txt-sec">{conversation.description !== "" && conversation.description !== undefined ? conversation.description : 'Pas encore de description'}</div>
                </div>
            </div>
            <div className="conversation-infos-bloc">
                <div className="w-full">
                    <div className="bold mb-1">Créé par</div>
                    <div className="txt-sec">{conversation.creator.pseudo} le {dateParser(conversation.createdAt)}</div>
                </div>
            </div>
            <div className="conversation-infos-bloc">
                <div className="w-full">
                    <div className="bold mb-1">Propriétaire</div>
                    <div className="txt-sec">{conversation.owner.pseudo}</div>
                </div>
            </div>
        </div>
    )
}

export default Main