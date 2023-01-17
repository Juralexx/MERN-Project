import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext'
import Warning from '../../tools/global/Warning'
import { deleteConv, leaveConversation } from '../actions'
import Icon from '../../tools/icons/Icon'

const Settings = ({ conversation }) => {
    const { uid, user, websocket, conversations, dispatch } = useContext(MessengerContext)
    const [warning, setWarning] = useState(null)

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice">
                <Icon name="Notification" /> Désactiver les notifications
            </div>
            <div className="tools-choice" onClick={() => setWarning('leave')}>
                <Icon name="Signout" /> Quitter la conversation
            </div>
            {conversation.owner._id === uid &&
                <div className="tools-choice" onClick={() => setWarning('delete')}>
                    <Icon name="Trash" /> Supprimer la conversation
                </div>
            }

            <Warning
                title="Quitter la conversation"
                text="Voulez-vous vraiment quitter cette conversation ? Vous ne pourrez plus revenir, sauf si quelqu'un vous réinvite."
                validateBtn="Quitter la conversation"
                className="delete"
                open={warning === 'leave'}
                setOpen={setWarning}
                onValidate={() => leaveConversation(conversation, uid, uid, websocket, dispatch)}
                onClose={() => setWarning(null)}
            >
            </Warning>
            <Warning
                title="Supprimer la conversation"
                text="Voulez-vous vraiment supprimer cette conversation ? Cette action est irréversible."
                validateBtn="Supprimer la conversation"
                className="delete"
                open={warning === 'delete'}
                setOpen={setWarning}
                onValidate={() => deleteConv(conversation, conversations, user, websocket, dispatch)}
                onClose={() => setWarning(null)}
            >
            </Warning>
        </div>
    )
}

export default Settings