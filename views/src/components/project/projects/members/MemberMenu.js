import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import SmallMenu from '../../../tools/components/SmallMenu'
import { excludeMember } from '../../../tools/functions/member'

const MemberMenu = ({ element, project, websocket, isAdmin, isManager, isUser, user, open, setOpen, uniqueKey }) => {
    return (
        element.id !== user._id &&
        <>
            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpen(uniqueKey)} />
            {open === uniqueKey &&
                <SmallMenu top="top-6">
                    {isManager && element.role === "user" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer">Nommer Admin</div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isManager && element.role === "admin" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer">Supprimer Admin</div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isAdmin && element.role === "user" &&
                        <>
                            <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, project, websocket)}>Supprimer ce membre</div>
                        </>
                    }
                    {isAdmin && element.role === "manager" &&
                        <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                    }
                    {isUser &&
                        <div className="py-2 cursor-pointer"><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
                    }
                </SmallMenu>
            }
        </>
    )
}

export default MemberMenu