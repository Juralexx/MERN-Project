import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { dateParser, removeAccents } from '../../../Utils'
import { getRole, isInResults, sortByAlpha, sortByOld, sortByRecent, sortByRole } from '../../../tools/functions/member'
import AddMember from './AddMember'
import MemberMenu from './MemberMenu'
import MembersRequests from './MembersRequests'
import { TextButton, ToolsBtn } from '../../../tools/global/Button'
import { ClassicInput, DropdownInput } from '../../../tools/global/Inputs'
import { MediumAvatar } from '../../../tools/global/Avatars'
import { MdOutlineMessage } from 'react-icons/md'
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { CgArrowAlignV } from 'react-icons/cg'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
    const [members, setMembers] = useState(project.members)
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
    const [filter, setFilter] = useState("")
    const [isByRecent, setIsByRecent] = useState(false)

    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMemberInResult, setMemberInResult] = useState([])
    const regexp = new RegExp(searchQuery, 'i')

    const searchMember = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length > 2) {
            const response = project.members.filter(member => regexp.test(removeAccents(member.pseudo)))
            let array = []
            response.map(e => array.push(e.pseudo))
            setMemberInResult(array)
            setSearch(true)
            if (!isMemberInResult || isMemberInResult.length === 0)
                setSearch(false)
        } else setSearch(false)
    }

    return (
        <>
            <div className="container-lg py-8">
                <div className="dashboard-members-title">
                    <h2>Membres <span>{project.members.length}</span></h2>
                    {(isAdmin || isManager) &&
                        <div className="dashboard-members-btn_container">
                            {project.member_requests.length > 0 &&
                                <TextButton className="btn_icon_start" onClick={() => setOpenRequests(true)}>
                                    Demandes en cours
                                </TextButton>
                            }
                            <TextButton className="btn_icon_start" onClick={() => setAddMembers(true)}>
                                <AiOutlinePlus />Ajouter un membre
                            </TextButton>
                        </div>
                    }
                </div>
                <div className="dashboard-members-tools">
                    <ClassicInput
                        className="w-[400px]"
                        inputClassName="full"
                        type="text"
                        placeholder="Rechercher un membre..."
                        value={searchQuery}
                        onInput={e => setSearchQuery(e.target.value)}
                        onChange={searchMember}
                        cross
                        onClean={() => { setSearch(false); setMembers(project.members); setSearchQuery('') }}
                    />
                    <DropdownInput
                        className="ml-3"
                        cross
                        placeholder="Filtrer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        onClean={() => { setMembers(project.members); setFilter("") }}
                    >
                        <div onClick={() => {
                            setMembers(sortByRecent(members))
                            setFilter("Plus récent au plus ancien")
                        }}
                        >
                            Plus récent au plus ancien
                        </div>
                        <div onClick={() => {
                            setMembers(sortByOld(members))
                            setFilter("Plus ancien au plus récent")
                        }}
                        >
                            Plus ancien au plus récent
                        </div>
                        <div onClick={() => {
                            setMembers(sortByRole(members))
                            setFilter("Par rôle")
                        }}
                        >
                            Par rôle
                        </div>
                        <div onClick={() => {
                            setMembers(sortByAlpha(members))
                            setFilter("Ordre alphabétique")
                        }}
                        >
                            Ordre alphabétique
                        </div>
                    </DropdownInput>
                </div>
                <div className="dashboard-members-table custom-scrollbar-x">
                    <div className="dashboard-members-table-header">
                        <div className="dashboard-members-table-tools" onClick={() => {
                            setMembers(sortByAlpha(members))
                            setFilter("Ordre alphabétique")
                        }}>
                            Nom <CgArrowAlignV />
                        </div>
                        <div className="dashboard-members-table-tools" onClick={() => {
                            setMembers(sortByRole(members))
                            setFilter("Par rôle")
                        }}>
                            Rôle <CgArrowAlignV />
                        </div>
                        <div className="dashboard-members-table-tools" onClick={
                            isByRecent ? (
                                () => {
                                    sortByOld(members)
                                    setIsByRecent(false)
                                }
                            ) : (
                                () => {
                                    sortByRecent(members)
                                    setIsByRecent(true)
                                }
                            )
                        }>
                            Membre depuis <CgArrowAlignV />
                        </div>
                        <div className="dashboard-members-table-tools"></div>
                    </div>
                    {members.map((element, key) => {
                        return (
                            <div className={`dashboard-members-member ${isInResults(removeAccents(element.pseudo), isMemberInResult, search, "flex")}`} key={key}>
                                <div className="dashboard-members-infos">
                                    <MediumAvatar pic={element.picture} />
                                    <div>{element.pseudo}</div>
                                </div>
                                <div className="dashboard-members-infos">{getRole(element)}</div>
                                <div className="dashboard-members-infos">{dateParser(element.since)}</div>
                                <div className="dashboard-members-infos justify-end">
                                    {element.id !== user._id &&
                                        <>
                                            <ToolsBtn>
                                                <MdOutlineMessage />
                                            </ToolsBtn>
                                            <ToolsBtn className="mx-2">
                                                <Link to={"/" + element.pseudo}>
                                                    <AiOutlineUser />
                                                </Link>
                                            </ToolsBtn>
                                            {(isManager || isAdmin) && element.role !== "manager" &&
                                                <MemberMenu
                                                    element={element}
                                                    project={project}
                                                    websocket={websocket}
                                                    isAdmin={isAdmin}
                                                    isManager={isManager}
                                                    user={user}
                                                />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                <AddMember
                    open={addMembers}
                    setOpen={setAddMembers}
                    project={project}
                    user={user}
                    websocket={websocket}
                    isAdmin={isAdmin}
                    isManager={isManager} />
            }
            {
                <MembersRequests
                    open={openRequests}
                    setOpen={setOpenRequests}
                    project={project}
                    user={user}
                    websocket={websocket}
                />
            }
        </>
    )
}

export default HomeMembers