import React, { useState, useRef } from 'react'
import { avatar } from '../../../tools/functions/useAvatar'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import AddMember from './AddMember'
import MembersRequests from './MembersRequests'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../../tools/components/SmallMenu'
import { getRole } from '../../../tools/functions/member'
import MemberMenu from './MemberMenu'

const Members = ({ project, setProject, isManager, isAdmin, user, websocket }) => {
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openMemberMenu, setOpenMemberMenu] = useState(-1)
    const memberMenu = useRef()
    useClickOutside(memberMenu, setOpenMemberMenu, -1)
    const membersMenu = useRef()
    useClickOutside(membersMenu, setOpenMenu, false)

    return (
        <>
            <div className="py-3">
                <div className="relative flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                    <div className="text-xl">Membres ({project.members.length})</div>
                    {(isAdmin || isManager) &&
                        <div ref={membersMenu}>
                            <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenMenu(!openMenu)} />
                            {openMenu && (
                                <SmallMenu>
                                    <div className="py-2 cursor-pointer" onClick={() => setAddMembers(true)}>Ajouter des membres</div>
                                    {project.member_requests.length > 0 && <div className="py-2 cursor-pointer" onClick={() => setOpenRequests(true)}>Voir les demandes en cours</div>}
                                </SmallMenu>
                            )}
                        </div>
                    }
                </div>
                {project.members.map((element, key) => {
                    return (
                        <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full mr-4" style={avatar(element.picture)}></div>
                                <div>
                                    <div className="">{element.pseudo}</div>
                                    <div className="text-xs text-gray-500 dark:text-slate-400">{getRole(element)}</div>
                                </div>
                            </div>
                            <div ref={memberMenu}>
                                <MemberMenu element={element} project={project} websocket={websocket} isAdmin={isAdmin} isManager={isManager} user={user} open={openMemberMenu} setOpen={setOpenMemberMenu} uniqueKey={key} />
                            </div>
                        </div>
                    )
                })}
            </div>
            {<AddMember open={addMembers} setOpen={setAddMembers} project={project} user={user} websocket={websocket} isAdmin={isAdmin} isManager={isManager}/>}
            {<MembersRequests open={openRequests} setOpen={setOpenRequests} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default Members