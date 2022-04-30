import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import SmallMenu from '../../../tools/components/SmallMenu'
import { excludeMember, nameAdmin, removeAdmin } from '../../../tools/functions/member'
import { clickOn } from '../../../tools/functions/useClickOutside'

const MemberMenu = ({ element, project, websocket, isAdmin, isManager, user, open, setOpen, uniqueKey }) => {
    const dispatch = useDispatch()

    return (
        <>
            <div className="tools_btn" onClick={() => clickOn(open, setOpen, uniqueKey)}>
                <BiDotsVerticalRounded />
            </div>
            {open === uniqueKey &&
                <SmallMenu>
                    {isManager && element.role === "user" &&
                        <>
                            <div className="tools_choice" onClick={() => nameAdmin(element, project, user, websocket, dispatch)}>Nommer Admin</div>
                            <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isManager && element.role === "admin" &&
                        <>
                            <div className="tools_choice" onClick={() => removeAdmin(element, project, user, websocket, dispatch)}>Supprimer Admin</div>
                            <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isAdmin && element.role === "user" &&
                        <>
                            <div className="tools_choice" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                </SmallMenu>
            }
        </>
    )
}

export default MemberMenu