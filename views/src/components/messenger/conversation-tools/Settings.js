import React, { useState } from 'react'
import Warning from '../../tools/components/Warning'
import { MdNotificationsActive } from 'react-icons/md'
import { HiLogout } from 'react-icons/hi'
import { IoTrashBin } from 'react-icons/io5'
import { deleteConv, leaveConversation } from '../functions/actions'

const Settings = ({ uid, websocket, conversation, dispatch }) => {
    const [warning, setWarning] = useState(null)

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice"><MdNotificationsActive /> Désactiver les notifications</div>
            <div className="tools-choice" onClick={() => setWarning('leave')}><HiLogout /> Quitter la conversation</div>
            {conversation.owner._id === uid &&
                <div className="tools-choice red" onClick={() => setWarning('delete')}><IoTrashBin /> Supprimer la conversation</div>
            }
            
            <Warning
                title="Quitter la conversation"
                text="Voulez-vous vraiment quitter cette conversation ? Vous ne pourrez plus revenir, sauf si quelqu'un vous réinvite."
                validateBtn="Quitter la conversation"
                className="delete"
                open={warning === 'leave'}
                setOpen={setWarning}
                onValidate={() => leaveConversation(conversation, uid)}
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
                onValidate={() => deleteConv(conversation, uid, websocket, dispatch)}
                onClose={() => setWarning(null)}
            >
            </Warning>
        </div>
    )
}

export default Settings