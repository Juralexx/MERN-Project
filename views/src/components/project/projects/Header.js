import React, { useState, useRef } from 'react'
import { useDispatch } from "react-redux";
import { avatar } from '../../tools/functions/useAvatar'
import { dateParser } from '../../Utils'
import { useClickOutside } from '../../tools/functions/useClickOutside';
import { leaveProject } from '../../tools/functions/member';
import SmallMenu from '../../tools/components/SmallMenu';
import Breadcrumb from '../../tools/components/Breadcrumb';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi'
import { HiCalendar } from 'react-icons/hi'

const Header = ({ project, websocket, user, members, description, messenger, tasks }) => {
    const menuRef = useRef()
    const [openMenu, setOpenMenu] = useState(false)
    useClickOutside(menuRef, setOpenMenu, false)
    const dispatch = useDispatch()

    return (
        <div className="dashboard-header">
            <Breadcrumb project={project} members={members} description={description} messenger={messenger} tasks={tasks} />

            <div className="dashboard-header-top">
                <div className="dashboard-header-left">
                    <div className="dashboard-header-img" style={avatar('img/paysage-4.jpg')}></div>
                    <div className="dashboard-header-content">
                        <h1>{project.title}</h1>
                        <div className="dashboard-header-content-infos">
                            <div className="infos"><HiLocationMarker />{project.location + ", " + project.department}</div>
                            <div className="infos"><HiCalendar />{dateParser(project.createdAt)}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="dashboard-header-right">
                        <div ref={menuRef} className="tools-btn" onClick={() => setOpenMenu(!openMenu)}>
                            <BiDotsVerticalRounded />
                        </div>
                        {openMenu && (
                            <SmallMenu top="top-6" right="right-16">
                                <div className="tools-choice" onClick={() => leaveProject(user, project, websocket, dispatch)}>Quitter le projet</div>
                            </SmallMenu>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header