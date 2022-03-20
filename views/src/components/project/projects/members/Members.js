import React, { useState, useRef } from 'react'
import { avatar } from '../../../tools/functions/useAvatar'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import AddMember from './AddMember'
import MembersRequests from './MembersRequests'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { excludeMember } from '../../../tools/functions/member'

const Members = ({ project, setProject, admins, user, websocket }) => {
    const [addMembers, setAddMembers] = useState(false)
    const [showRequests, setShowRequests] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openMemberMenu, setOpenMemberMenu] = useState(-1)
    const memberMenu = useRef()
    useClickOutside(memberMenu, setOpenMemberMenu, -1)
    const membersMenu = useRef()
    useClickOutside(membersMenu, setOpenMenu, false)
    const isAdmin = admins.some(member => member.id === user._id)

    return (
        <>
            <div className="py-3">
                <div className="relative flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                    <div className="text-xl">Membres ({project.members.length})</div>
                    {isAdmin &&
                        <div ref={membersMenu}>
                            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenMenu(!openMenu)} />
                            {openMenu && (
                                <SmallMenu>
                                    <div className="py-2 cursor-pointer" onClick={() => setAddMembers(true)}>Ajouter des membres</div>
                                    {project.member_requests.length > 0 && <div className="py-2 cursor-pointer" onClick={() => setShowRequests(true)}>Voir les demandes en cours</div>}
                                </SmallMenu>
                            )}
                        </div>
                    }
                </div>
                {project.members.map((element, key) => {
                    return (
                        <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                            <div className="flex">
                                <div className="h-11 w-11 rounded-full mr-4" style={avatar(element.picture)}></div>
                                <div>
                                    <div className="">{element.pseudo}</div>
                                    <div className="text-gray-500 dark:text-slate-400">{element.role}</div>
                                </div>
                            </div>
                            <div ref={memberMenu}>
                                {element.id !== user._id && (
                                    <>
                                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenMemberMenu(key)} />
                                        {openMemberMenu === key && (
                                            <SmallMenu top="top-6">
                                                <div className="py-2 cursor-pointer">Voir le profil</div>
                                                {isAdmin &&
                                                    <>
                                                        {element.role !== "admin" && (
                                                            <div className="py-2 cursor-pointer">Nommer Admin</div>
                                                        )}
                                                        {element.role === "admin" && project.posterId === user._id && element.id !== user._id && (
                                                            <div className="py-2 cursor-pointer">Supprimer Admin</div>
                                                        )}
                                                        {element.id !== user._id && project.posterId === user._id && (
                                                            <div className="py-2 cursor-pointer" onClick={() => excludeMember(element, project, websocket)}>Supprimer ce membre</div>
                                                        )}
                                                    </>
                                                }
                                            </SmallMenu>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            {<AddMember open={addMembers} setOpen={setAddMembers} project={project} user={user} websocket={websocket} admins={admins} />}
            {<MembersRequests open={showRequests} setOpen={setShowRequests} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default Members