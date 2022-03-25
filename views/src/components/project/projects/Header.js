import React, { useState, useRef } from 'react'
import { useDispatch } from "react-redux";
import { avatar } from '../../tools/functions/useAvatar'
import { dateParser } from '../../Utils'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import SmallMenu from '../../tools/components/SmallMenu';
import { useClickOutside } from '../../tools/functions/useClickOutside';
import { leaveProject } from '../../tools/functions/member';

const Header = ({ project, websocket, user }) => {
    const menuRef = useRef()
    const [openMenu, setOpenMenu] = useState(false)
    useClickOutside(menuRef, setOpenMenu, false)
    const dispatch = useDispatch()

    return (
        <div className="dashboard-header">
            <div className="dashboard-header-left">
                <div className="dashboard-header-img" style={avatar('img/paysage-4.jpg')}></div>
                <div className="dashboard-header-content">
                    <h1>{project.title}</h1>
                    <div className="infos">{dateParser(project.createdAt) + " - " + project.location + ", " + project.department}</div>
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
    )
}

export default Header