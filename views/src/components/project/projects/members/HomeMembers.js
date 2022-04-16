import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { getRole } from '../../../tools/functions/member'
import AddMember from './AddMember'
import MembersRequests from './MembersRequests'
import MemberMenu from './MemberMenu'
import SmallMenu from '../../../tools/components/SmallMenu'
import { TextButton, ToolsBtn } from '../../../tools/components/Button'
import { MediumAvatar } from '../../../tools/components/Avatars'
import { MdOutlineMessage } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
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
            <div className="home-members">
                <div className="home-members-header">
                    <h2>Membres <span>{project.members.length}</span></h2>
                    <div className="flex">
                        <Link to="members"><TextButton text="Voir tous" className="mr-2" /></Link>
                        {(isAdmin || isManager) &&
                            <div ref={membersMenu}>
                                <ToolsBtn onClick={() => setOpenMenu(!openMenu)}><BiDotsVerticalRounded /></ToolsBtn>
                                {openMenu && (
                                    <SmallMenu top="top-1">
                                        <div className="tools-choice" onClick={() => setAddMembers(true)}>Ajouter des membres</div>
                                        {project.member_requests.length > 0 && <div className="tools-choice" onClick={() => setOpenRequests(true)}>Voir les demandes en cours</div>}
                                    </SmallMenu>
                                )}
                            </div>
                        }
                    </div>
                </div>

                <div className="home-members-container custom-scrollbar">
                    {project.members.map((element, key) => {
                        return (
                            <div className="home-members-member" key={key}>
                                <div className="home-members-infos">
                                    <MediumAvatar pic={element.picture} />
                                    <div className="home-members-infos-name">
                                        <div>{element.pseudo}</div>
                                        <div className="role">{getRole(element)}</div>
                                    </div>
                                </div>
                                <div className="home-members-infos justify-end">
                                    {element.id !== user._id &&
                                        <>
                                            <ToolsBtn><MdOutlineMessage /></ToolsBtn>
                                            <ToolsBtn className="mx-2"><Link to={"/" + element.pseudo}><FaRegUser /></Link></ToolsBtn>
                                            <div ref={memberMenu}>
                                                <MemberMenu element={element} project={project} websocket={websocket} isAdmin={isAdmin} isManager={isManager} user={user} open={openMemberMenu} setOpen={setOpenMemberMenu} uniqueKey={key} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {<AddMember open={addMembers} setOpen={setAddMembers} project={project} user={user} websocket={websocket} isAdmin={isAdmin} isManager={isManager} />}
            {<MembersRequests open={openRequests} setOpen={setOpenRequests} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default HomeMembers