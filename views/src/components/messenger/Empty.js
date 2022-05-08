import { avatar } from "../tools/functions/useAvatar"
import { dateParser } from "../Utils"
import { getMembers } from "./tools/function"

export const NoConversation = () => {
    return (
        <div className="conversation-box-container">
            <div className="no-conversation-yet">
                <img src={`${process.env.REACT_APP_API_URL}files/img/no-conversation.png`} alt="Pas encore de conversation" />
                <p>Créer votre première conversation pour commencer à chatter !</p>
            </div>
        </div>
    )
}


export const EmptyDialog = ({ uid, currentChat }) => {
    const member = getMembers(currentChat, uid)[0]
    return (
        <div className="no-conversation-yet">
            <div className="user-avatar" style={avatar(member.picture)} />
            <div className="user-pseudo">{member.pseudo}</div>
            <p className="mt-2">Nouvelle conversation</p>
            <div className="f-12 txt-sec">{dateParser(currentChat.createdAt)}</div>
        </div>
    )
}


export const EmptyGroup = ({ uid, currentChat }) => {
    const members = getMembers(currentChat, uid)
    return (
        <div className="no-conversation-yet">
            <div className="flex">
                {members.slice(0, 4).map((member, key) => {
                    return (
                        <div className="user-avatar" style={avatar(member.picture)} key={key} />
                    )
                })}
            </div>
            <div className="user-pseudo">
                {members.length === 2 &&
                    members[0].pseudo + ", " + members[1].pseudo
                }
                {members.length === 3 &&
                    members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo
                }
                {members.length > 3 &&
                    members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo + " et " + (members.length - 3) + " autres"
                }
            </div>
            <p className="mt-2">Nouvelle conversation</p>
            <div className="f-12 txt-sec">{dateParser(currentChat.createdAt)}</div>
        </div>
    )
}