import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { dateParser, fullImage } from '../Utils'
import { leaveProject } from '../tools/functions/member';
//import Breadcrumb from './Breadcrumb';
import Navbar from './Navbar';
import ToolsMenu from '../tools/global/ToolsMenu';
import Warning from '../tools/global/Warning';
import Icon from '../tools/icons/Icon';

const Header = ({ project, websocket, user, isManager }) => {
    const dispatch = useDispatch()
    const [warning, setWarning] = useState(false)

    return (
        <div className="dashboard-header">
            <div className="container-lg pt-7 pb-5">
                {/*<Breadcrumb project={project} />*/}
                <div className="dashboard-header-top">
                    <div className="dashboard-header_left">
                        <div className="dashboard-header-img" style={fullImage(project.pictures[0])}></div>
                        <div className="dashboard-header-content">
                            <h1>{project.title}</h1>
                            <div className="dashboard-header-content-infos">
                                <div className="infos">
                                    <Icon name="Position" />{project.location.city + ", " + project.location.department}
                                </div>
                                <div className="infos">
                                    <Icon name="Calendar" />{dateParser(project.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-header_right">
                        <ToolsMenu>
                            <Link className='tools_choice' to={`/project/${project.URLID}/${project.URL}`}>
                                Voir la page du projet
                            </Link>
                            {isManager &&
                                <>
                                    <Link className='tools_choice' to={`/projects/${project.URLID}/${project.URL}/edit`}>
                                        Modifier le projet
                                    </Link>
                                    <Link className='tools_choice' to={`/projects/${project.URLID}/${project.URL}/add-actuality`}>
                                        Ajouter une actualité
                                    </Link>
                                </>
                            }
                            {project.poster._id !== user._id &&
                                <div className="tools_choice" onClick={() => setWarning(true)}>
                                    Quitter le projet
                                </div>
                            }
                        </ToolsMenu>
                    </div>
                </div>
            </div>
            <Navbar
                project={project}
                isManager={isManager}
            />
            <Warning
                open={warning}
                setOpen={setWarning}
                title="Etes-vous sur de vouloir quitter ce projet ?"
                text="Cette action est définitive"
                onValidate={() => {
                    leaveProject(user, project, websocket, dispatch)
                    setWarning(false)
                }}
            />
        </div>
    )
}

export default Header