import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRole } from '../../tools/functions/member'
import AddMember from './AddMember'
import MembersRequests from './MembersRequests'
import MemberMenu from './MemberMenu'
import { TextButton, ToolsBtn } from '../../tools/global/Button'
import { MediumAvatar } from '../../tools/global/Avatars'
import ToolsMenu from '../../tools/global/ToolsMenu'
import Icon from '../../tools/icons/Icon'

const HomeMembers = ({ project, isManager, isAdmin, user, websocket }) => {
    const [addMembers, setAddMembers] = useState(false)
    const [openRequests, setOpenRequests] = useState(false)

    return (
        <>
            <div className="dashboard-card home-members">
                <div className="home-members-header">
                    <h3>Membres <span>{project.members.length}</span></h3>
                    <div className="flex items-center">
                        <TextButton className="mr-4">
                            <Link to="members">Voir tous</Link>
                        </TextButton>
                        {(isAdmin || isManager) &&
                            <ToolsMenu>
                                <div className="tools_choice" onClick={() => setAddMembers(true)}>
                                    Ajouter des membres
                                </div>
                                {project.member_requests.length > 0 && <div className="tools_choice" onClick={() => setOpenRequests(true)}>
                                    Voir les demandes en cours
                                </div>}
                            </ToolsMenu>
                        }
                    </div>
                </div>

                <div className="dashboard-card-container home-members-container custom-scrollbar">
                    {project.members.map((element, key) => {
                        return (
                            <div className="home-members-member" key={key}>
                                <div className="home-members-infos">
                                    <MediumAvatar pic={element.picture} />
                                    <div className="home-members-infos-name">
                                        <div>{element.pseudo}</div>
                                        <div className="role">
                                            {getRole(element)}
                                        </div>
                                    </div>
                                </div>
                                <div className="home-members-infos justify-end">
                                    {element.id !== user._id &&
                                        <>
                                            <ToolsBtn>
                                                <Icon name="Message" />
                                            </ToolsBtn>
                                            <ToolsBtn className="mx-2">
                                                <Link to={"/" + element.pseudo}>
                                                    <Icon name="User" />
                                                </Link>
                                            </ToolsBtn>
                                            <MemberMenu
                                                element={element}
                                                project={project}
                                                websocket={websocket}
                                                isAdmin={isAdmin}
                                                isManager={isManager}
                                                user={user}
                                            />
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <AddMember
                open={addMembers}
                setOpen={setAddMembers}
                project={project}
                user={user}
                websocket={websocket}
                isAdmin={isAdmin}
                isManager={isManager}
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

export default HomeMembers