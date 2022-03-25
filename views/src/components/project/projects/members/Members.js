import React, { useState, useRef } from 'react'
import { avatar } from '../../../tools/functions/useAvatar'
import { useClickOutside } from '../../../tools/functions/useClickOutside'
import AddMember from './AddMember'
import MembersRequests from './MembersRequests'
import { MdOutlineMessage } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgArrowAlignV } from 'react-icons/cg'
import { checkDateSort, getRole, sortByAlpha, sortByOld, sortByRecent, sortByRole } from '../../../tools/functions/member'
import MemberMenu from './MemberMenu'
import { IconButton, Button, IconToggle } from '../../../tools/components/Button'
import { dateParser } from '../../../Utils'
import { NavLink } from 'react-router-dom'
import { BasicInput } from '../../../tools/components/Inputs'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
    const [members, setMembers] = useState(project.members)
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
    const [openMemberMenu, setOpenMemberMenu] = useState(-1)
    const memberMenu = useRef()
    useClickOutside(memberMenu, setOpenMemberMenu, -1)
    const [filter, setFilter] = useState("Filtrer")
    const [display, setDisplay] = useState(false)
    const [isByRecent, setIsByRecent] = useState(false)

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMemberInResult, setMemberInResult] = useState([])
    const isEmpty = !isMemberInResult || isMemberInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');
    const handleInputChange = (e) => { setSearchQuery(e.target.value) }
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
            <div className="bg-white dark:bg-background_primary_light my-5 mx-auto w-[97%] max-w-[1366px] text-gray-500 dark:text-slate-300 px-6 py-6 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="text-xl">Membres ({project.members.length})</div>
                    {(isAdmin || isManager) &&
                        <div>
                            <IconButton text="Ajouter un membre" startIcon={<AiOutlinePlusCircle />} onClick={() => setAddMembers(true)} />
                            {project.member_requests.length > 0 && <Button text="Voir les demandes en cours" onClick={() => setOpenRequests(true)} />}
                        </div>
                    }
                </div>
                <div className="relative flex pt-5 pb-1 mb-3">
                    <BasicInput placeholder="Rechercher un membre..." value={searchQuery} onInput={handleInputChange} onChange={searchMember} type="search" />
                    <div className="relative">
                        <BasicInput readOnly placeholder={filter} className="ml-3 max-w-[200px]" onClick={() => setDisplay(!display)} />
                        {display &&
                            <div className="absolute left-2 w-[300px] bg-white dark:bg-background_primary_x_light p-3 z-[1500] shadow-lg rounded-lg">
                                <div className="py-2 cursor-pointer" onClick={() => sortByRecent(members, setMembers, setFilter, setDisplay)}>Plus récent au plus ancien</div>
                                <div className="py-2 cursor-pointer" onClick={() => sortByOld(members, setMembers, setFilter, setDisplay)}>Plus ancien au plus récent</div>
                                <div className="py-2 cursor-pointer" onClick={() => sortByRole(members, setMembers, setFilter, setDisplay)}>Par rôle</div>
                                <div className="py-2 cursor-pointer" onClick={() => sortByAlpha(members, setMembers, setFilter, setDisplay)}>Ordre alphabétique</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="relative flex justify-between items-center mt-3 mb-2 border-b border-b-slate-300/30">
                    <div className="flex items-center py-2 px-2 w-1/4 cursor-pointer" onClick={() => sortByAlpha(members, setMembers, setFilter, setDisplay)}>Nom <CgArrowAlignV /></div>
                    <div className="flex items-center py-2 px-2 w-1/4 cursor-pointer" onClick={() => sortByRole(members, setMembers, setFilter, setDisplay)}>Rôle <CgArrowAlignV /></div>
                    <div className="flex items-center py-2 px-2 w-1/4 cursor-pointer" onClick={() => checkDateSort(isByRecent, setIsByRecent, members, setMembers, setFilter, setDisplay)}>Membre depuis <CgArrowAlignV /></div>
                    <div className="flex items-center py-2 px-2 w-1/4"></div>
                </div>
                {members.map((element, key) => {
                    return (
                        <div className="relative flex justify-between items-center" key={key} style={{ display: search ? (isMemberInResult.includes(element) ? "flex" : "none") : ("flex") }}>
                            <div className="py-2 px-2 w-1/4 flex items-center">
                                <div className="h-10 w-10 rounded-full mr-4" style={avatar(element.picture)}></div>
                                <div className="">{element.pseudo}</div>
                            </div>
                            <div className="py-2 px-2 w-1/4">{getRole(element)}</div>
                            <div className="py-2 px-2 w-1/4">{dateParser(element.since)}</div>
                            <div className="py-2 px-2 w-1/4 flex items-center justify-end">
                                {element.id !== user._id &&
                                    <>
                                        <IconToggle icon={<MdOutlineMessage />} className="flex items-center justify-center dark:bg-background_primary_x_light" />
                                        <NavLink to={"/" + element.pseudo}><IconToggle icon={<FaRegUser />} className="flex items-center justify-center ml-2 mr-4 dark:bg-background_primary_x_light" /></NavLink>
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
            {<AddMember open={addMembers} setOpen={setAddMembers} project={project} user={user} websocket={websocket} isAdmin={isAdmin} isManager={isManager} />}
            {<MembersRequests open={openRequests} setOpen={setOpenRequests} project={project} user={user} websocket={websocket} />}
        </>
    )
}

export default HomeMembers