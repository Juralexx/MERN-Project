import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SmallMenu from '../../../tools/components/SmallMenu'
import { excludeMember, nameAdmin, removeAdmin } from '../../../tools/functions/member'

const MemberMenu = ({ element, project, websocket, isAdmin, isManager, user, open, setOpen, uniqueKey }) => {
    const dispatch = useDispatch()

    return (
        element.id !== user._id &&
        <>
            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpen(uniqueKey)} />
            {open === uniqueKey &&
                <SmallMenu top="top-6">
                    {isManager && element.role === "user" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer" onClick={() => nameAdmin(element, project, user, websocket, dispatch)}>Nommer Admin</div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isManager && element.role === "admin" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer" onClick={() => removeAdmin(element, project, user, websocket, dispatch)}>Supprimer Admin</div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isAdmin && element.role === "user" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, user.pseudo, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isAdmin && element.role === "manager" &&
                        <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                    }
                    {(!isAdmin && !isManager) &&
                        <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                    }
                </SmallMenu>
            }
        </>
    )
}

export default MemberMenu