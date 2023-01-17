import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dateParser, removeAccents } from '../../Utils'
import { returnMemberRole, isUserInSearchResults, sortByAlpha, sortByOld, sortByRecent, sortByRole } from '../../tools/functions/member'
import AddMember from './AddMember'
import MemberMenu from './MemberMenu'
import MembersRequests from './MembersRequests'
import { TextButton, ToolsBtn } from '../../tools/global/Button'
import { ClassicInput, DropdownInput } from '../../tools/global/Inputs'
import { MediumAvatar } from '../../tools/global/Avatars'
import Icon from '../../tools/icons/Icon'
import { useFetchUsers } from '../../tools/custom-hooks/useFetchUsers'

const Members = ({ project, isManager, isAdmin, user, websocket }) => {
    const [members, setMembers] = useState(project.members)
    const { usersArr } = useFetchUsers(project.members)

    useEffect(() => {
        if (usersArr.length > 0) {
            let arr = []
            usersArr.forEach((user, key) => {
                let el = project.members.find(member => member._id === user._id)
                if (el)
                    arr.push({ ...user, ...el })
                if (key === project.members.length - 1)
                    setMembers(arr)
            })
        }
    }, [usersArr, project.members])

    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)
    const [filter, setFilter] = useState("")
    const [isByRecent, setIsByRecent] = useState(false)

    /**
     * Search function
     */

    const [search, setSearch] = useState({
        state: false,
        query: "",
        results: []
    })
    const regexp = new RegExp(search.query, 'i')

    const searchMember = () => {
        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const response = project.members.filter(member => regexp.test(removeAccents(member.pseudo)))
            setSearch(data => ({ ...data, state: true, results: response }))
            if (!search.results || search.results.length === 0)
                setSearch(data => ({ ...data, state: false }))
        } else setSearch(data => ({ ...data, state: false }))
    }

    /**
     * 
     */

    return (
        <>
            <div className="container-lg py-8 !px-0 sm:!px-3">
                <div className='dashboard-big-card'>
                    <div className="dashboard-big-card-title">
                        <h2>Membres <span>{project.members.length}</span></h2>
                        {(isAdmin || isManager) &&
                            <div className="dashboard-big-card-btn_container">
                                {project.member_requests.length > 0 &&
                                    <TextButton className="btn_icon_start" onClick={() => setOpenRequests(true)}>
                                        Demandes en cours
                                    </TextButton>
                                }
                                <TextButton className="btn_icon_start" onClick={() => setAddMembers(true)}>
                                    <Icon name="Plus" />Ajouter un membre
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
                            value={search.query}
                            onInput={e => setSearch(data => ({ ...data, query: e.target.value }))}
                            onChange={searchMember}
                            cross
                            onClean={() => {
                                setSearch(data => ({ ...data, state: false, query: "" }))
                                setMembers(project.members)
                            }}
                        />
                        <DropdownInput
                            className="ml-3"
                            placeholder="Filtrer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            cross
                            onClean={() => {
                                setMembers(project.members)
                                setFilter("")
                            }}
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
                                Nom <Icon name="UpAndDown" />
                            </div>
                            <div className="dashboard-members-table-tools" onClick={() => {
                                setMembers(sortByRole(members))
                                setFilter("Par rôle")
                            }}>
                                Rôle <Icon name="UpAndDown" />
                            </div>
                            <div className="dashboard-members-table-tools">
                                Contact
                            </div>
                            <div className="dashboard-members-table-tools" onClick={
                                isByRecent ? (() => {
                                    sortByOld(members)
                                    setIsByRecent(false)
                                }) : (() => {
                                    sortByRecent(members)
                                    setIsByRecent(true)
                                })
                            }>
                                Membre depuis <Icon name="UpAndDown" />
                            </div>
                            <div className="dashboard-members-table-tools"></div>
                        </div>
                        <div className='dashboard-members-table-body custom-scrollbar'>
                            {members.map((element, key) => {
                                return (
                                    <div className={`dashboard-members-member ${isUserInSearchResults(element, search.results, search.state, 'flex')}`} key={key}>
                                        <div className="dashboard-members-infos">
                                            <MediumAvatar pic={element.picture} />
                                            <div>
                                                <div className='pseudo'>{element.pseudo}</div>
                                                <div className='work'>{element?.work}</div>
                                            </div>
                                        </div>
                                        <div className="dashboard-members-infos">
                                            {returnMemberRole(element)}
                                        </div>
                                        <div className="dashboard-members-infos">
                                            <div className='flex flex-col'>
                                                <a href={`mailto:${element?.email}`}>{element?.email}</a>
                                                <a href={`tel:${element?.phone}`}>{element?.phone}</a>
                                            </div>
                                        </div>
                                        <div className="dashboard-members-infos">
                                            {dateParser(element.since)}
                                        </div>
                                        <div className="dashboard-members-infos justify-end">
                                            {element._id !== user._id &&
                                                <>
                                                    <ToolsBtn>
                                                        <Icon name="Message" />
                                                    </ToolsBtn>
                                                    <ToolsBtn className="mx-2">
                                                        <Link to={"/" + element.pseudo}>
                                                            <Icon name="User" />
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
                </div>
            </div>
            <AddMember
                open={addMembers}
                setOpen={setAddMembers}
                project={project}
                user={user}
                websocket={websocket}
            />
            <MembersRequests
                open={openRequests}
                setOpen={setOpenRequests}
                project={project}
                user={user}
                websocket={websocket}
            />
        </>
    )
}

export default Members