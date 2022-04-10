import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import { dateParser } from '../../../Utils'
import { checkDateSort, getRole, sortByAlpha, sortByOld, sortByRecent, sortByRole } from '../../../tools/functions/member'
import AddMember from './AddMember'
import MemberMenu from './MemberMenu'
import MembersRequests from './MembersRequests'
import { StartIconOutlinedButton, ToolsBtn } from '../../../tools/components/Button'
import { ClassicInput, DropdownInput } from '../../../tools/components/Inputs'
import { MdOutlineMessage } from 'react-icons/md'
import { FaRegUser, FaTasks } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgArrowAlignV } from 'react-icons/cg'
import { BigAvatar } from '../../../tools/components/Avatars'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
    const [members, setMembers] = useState(project.members)
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
    const [openMemberMenu, setOpenMemberMenu] = useState(-1)
    const memberMenu = useRef()
    useClickOutside(memberMenu, setOpenMemberMenu, -1)
    const filterMenu = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(filterMenu, setDisplay, false)
    const [filter, setFilter] = useState("Filtrer")
    const [isByRecent, setIsByRecent] = useState(false)

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMemberInResult, setMemberInResult] = useState([])
    const isEmpty = !isMemberInResult || isMemberInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i')
    const searchMember = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = project.members.filter(member => regexp.test(member.pseudo))
            setMemberInResult(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    return (
        <>
            <div className="dashboard-members">
                <div className="dashboard-members-container">
                    <div className="dashboard-members-title">
                        <h2>Membres <span>{project.members.length}</span></h2>
                        {(isAdmin || isManager) &&
                            <div className="flex">
                                {project.member_requests.length > 0 && <StartIconOutlinedButton text="Demandes en cours" icon={<FaTasks />} onClick={() => setOpenRequests(true)} />}
                                <StartIconOutlinedButton text="Ajouter un membre" icon={<AiOutlinePlusCircle />} onClick={() => setAddMembers(true)} />
                            </div>
                        }
                    </div>
                    <div className="dashboard-members-tools">
                        <ClassicInput className="w-[350px]" type="search" placeholder="Rechercher un membre..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchMember} />
                        <DropdownInput useRef={filterMenu} cross readOnly placeholder={filter} className="ml-3" open={display} onClick={() => setDisplay(!display)}>
                            <div onClick={() => sortByRecent(members, setMembers, setFilter, setDisplay)}>Plus récent au plus ancien</div>
                            <div onClick={() => sortByOld(members, setMembers, setFilter, setDisplay)}>Plus ancien au plus récent</div>
                            <div onClick={() => sortByRole(members, setMembers, setFilter, setDisplay)}>Par rôle</div>
                            <div onClick={() => sortByAlpha(members, setMembers, setFilter, setDisplay)}>Ordre alphabétique</div>
                        </DropdownInput>
                    </div>
                    <div className="dashboard-members-table-header">
                        <div className="dashboard-members-table-tools" onClick={() => sortByAlpha(members, setMembers, setFilter, setDisplay)}>Nom <CgArrowAlignV /></div>
                        <div className="dashboard-members-table-tools" onClick={() => sortByRole(members, setMembers, setFilter, setDisplay)}>Rôle <CgArrowAlignV /></div>
                        <div className="dashboard-members-table-tools" onClick={() => checkDateSort(isByRecent, setIsByRecent, members, setMembers, setFilter, setDisplay)}>Membre depuis <CgArrowAlignV /></div>
                        <div className="w-1/4"></div>
                    </div>
                    {members.map((element, key) => {
                        return (
                            <div className="dashboard-members-member" key={key} style={{ display: search ? (isMemberInResult.includes(element) ? "flex" : "none") : ("flex") }}>
                                <div className="dashboard-members-infos">
                                    <BigAvatar pic={element.picture} />
                                    <div>{element.pseudo}</div>
                                </div>
                                <div className="dashboard-members-infos">{getRole(element)}</div>
                                <div className="dashboard-members-infos">{dateParser(element.since)}</div>
                                <div className="dashboard-members-infos justify-end">
                                    {element.id !== user._id &&
                                        <>
                                            <ToolsBtn><MdOutlineMessage /></ToolsBtn>
                                            <ToolsBtn className="mx-2"><Link to={"/" + element.pseudo}><FaRegUser /></Link></ToolsBtn>
                                            {(isManager || isAdmin) && element.role !== "manager" &&
                                                <div ref={memberMenu}>
                                                    <MemberMenu element={element} project={project} websocket={websocket} isAdmin={isAdmin} isManager={isManager} user={user} open={openMemberMenu} setOpen={setOpenMemberMenu} uniqueKey={key} />
                                                </div>
                                            }
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