import React from 'react'
import { useDispatch } from 'react-redux'
import ToolsMenu from '../../../tools/global/ToolsMenu'
import { excludeMember, nameAdmin, removeAdmin } from '../../../tools/functions/member'

const MemberMenu = ({ element, project, websocket, isAdmin, isManager, user }) => {
    const dispatch = useDispatch()

    return (
        <ToolsMenu>
            {isManager && element.role === "user" &&
                <>
                    <div className="tools_choice" onClick={() => nameAdmin(element, project, user, websocket, dispatch)}>
                        Nommer Admin
                    </div>
                    <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>
                        Supprimer ce membre
                    </div>
                </>
            }
            {isManager && element.role === "admin" &&
                <>
                    <div className="tools_choice" onClick={() => removeAdmin(element, project, user, websocket, dispatch)}>
                        Supprimer Admin
                    </div>
                    <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>
                        Supprimer ce membre
                    </div>
                </>
            }
            {isAdmin && element.role === "user" &&
                <>
                    <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>
                        Supprimer ce membre
                    </div>
                </>
            }
        </ToolsMenu>
    )
}

export default MemberMenu