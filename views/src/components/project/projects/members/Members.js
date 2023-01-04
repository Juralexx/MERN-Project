import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { dateParser } from '../../../Utils'
import { checkDateSort, getRole, sortByAlpha, sortByOld, sortByRecent, sortByRole } from '../../../tools/functions/member'
import AddMember from './AddMember'
import MemberMenu from './MemberMenu'
import MembersRequests from './MembersRequests'
import { OutlinedButton, ToolsBtn } from '../../../tools/global/Button'
import { ClassicInput, DropdownInput } from '../../../tools/global/Inputs'
import { BigAvatar } from '../../../tools/global/Avatars'
import { MdOutlineMessage } from 'react-icons/md'
import { FaRegUser, FaTasks } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgArrowAlignV } from 'react-icons/cg'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
    const [members, setMembers] = useState(project.members)
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
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
            <div className="content_container">
                <div className="content_box">
                    <div className="dashboard-members-title">
                        <h2>Membres <span>{project.members.length}</span></h2>
                        {(isAdmin || isManager) &&
                            <div className="flex">
                                {project.member_requests.length > 0 && <OutlinedButton className="btn_icon_start" onClick={() => setOpenRequests(true)}><FaTasks />Demandes en cours</OutlinedButton>}
                                <OutlinedButton className="btn_icon_start" onClick={() => setAddMembers(true)}><AiOutlinePlusCircle />Ajouter un membre</OutlinedButton>
                            </div>
                        }
                    </div>
                    <div className="dashboard-members-tools">
                        <ClassicInput className="w-[400px]" inputClassName="full" type="search" placeholder="Rechercher un membre..." value={searchQuery} onInput={e => setSearchQuery(e.target.value)} onChange={searchMember} />
                        <DropdownInput cross readOnly placeholder={filter} className="ml-3">
                            <div onClick={() => sortByRecent(members, setMembers, setFilter)}>Plus récent au plus ancien</div>
                            <div onClick={() => sortByOld(members, setMembers, setFilter)}>Plus ancien au plus récent</div>
                            <div onClick={() => sortByRole(members, setMembers, setFilter)}>Par rôle</div>
                            <div onClick={() => sortByAlpha(members, setMembers, setFilter)}>Ordre alphabétique</div>
                        </DropdownInput>
                    </div>
                    <div className="dashboard-members-table-header">
                        <div className="dashboard-members-table-tools" onClick={() => sortByAlpha(members, setMembers, setFilter)}>Nom <CgArrowAlignV /></div>
                        <div className="dashboard-members-table-tools" onClick={() => sortByRole(members, setMembers, setFilter)}>Rôle <CgArrowAlignV /></div>
                        <div className="dashboard-members-table-tools" onClick={() => checkDateSort(isByRecent, setIsByRecent, members, setMembers, setFilter)}>Membre depuis <CgArrowAlignV /></div>
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
                                                <MemberMenu element={element} project={project} websocket={websocket} isAdmin={isAdmin} isManager={isManager} user={user} />
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