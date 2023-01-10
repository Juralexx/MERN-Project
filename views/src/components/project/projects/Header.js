import React from 'react'
import { useDispatch } from "react-redux";
import { dateParser, fullImage } from '../../Utils'
import { leaveProject } from '../../tools/functions/member';
import Breadcrumb from './Breadcrumb';
import { IoCalendarClearOutline, IoLocationOutline } from 'react-icons/io5'
import ToolsMenu from '../../tools/global/ToolsMenu';
import Navbar from './Navbar';

const Header = ({ project, websocket, user, isManager }) => {
    const dispatch = useDispatch()

    return (
        <div className="dashboard-header">
            <div className="container-lg py-5">
                {/*<Breadcrumb project={project} />*/}
                <div className="dashboard-header-top">
                    <div className="dashboard-header_left">
                        <div className="dashboard-header-img" style={fullImage(project.pictures[0])}></div>
                        <div className="dashboard-header-content">
                            <h1>{project.title}</h1>
                            <div className="dashboard-header-content-infos">
                                <div className="infos">
                                    <IoLocationOutline />{project.location + ", " + project.department}
                                </div>
                                <div className="infos">
                                    <IoCalendarClearOutline />{dateParser(project.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-header_right">
                        <ToolsMenu>
                            <div className="tools_choice" onClick={() => leaveProject(user, project, websocket, dispatch)}>Quitter le projet</div>
                        </ToolsMenu>
                    </div>
                </div>
            </div>
            <Navbar
                project={project}
                isManager={isManager}
            />
        </div>
    )
}

export default Header