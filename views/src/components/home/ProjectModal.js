import React from "react";
import { NavLink } from "react-router-dom";
import { avatar, projectPicture } from "../tools/functions/useAvatar";
import { ImCross } from 'react-icons/im'
import { dateParser } from "../Utils";
import LikersModal from "../tools/components/LikersModal";
import FollowersModal from "../tools/components/FollowersModal";
import FavoriteButton from "../tools/components/FavoriteButton";
import { BsFillPersonFill } from "react-icons/bs";
import { parseDescriptionToInnerHTML } from "../tools/functions/parseDescription";

const ProjectModal = ({ project, setOpen, open }) => {
    const modalClose = () => { setOpen(false) }
    const coverClass = open ? 'modal-cover modal-cover-active project-modal-cover' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal project-modal' : 'modal-container hide-modal'

    return (
        <>
            <div className={containerClass}>
                <div className="close-modal" onClick={modalClose}><ImCross /></div>
                <div className="left" style={projectPicture('img/paysage-4.jpg')}>
                    <FavoriteButton project={project} />
                </div>
                <div className="right">
                    <div className="title">
                        <h2><NavLink to={"/project/" + project.URL}>{project.title}</NavLink></h2>
                        <p>{project.location + ", " + project.department + " - " + project.category}</p>
                    </div>
                    <div className="top">
                        <div><BsFillPersonFill /><span>{project.numberofcontributors}</span></div>
                        <div className="completed-status">{project.state}</div>
                    </div>

                    <div className="description"><p dangerouslySetInnerHTML={parseDescriptionToInnerHTML(project)}></p></div>
                    <div className="bottom">
                        <div className="action-container">
                            <div className="action">
                                <LikersModal project={project} />
                            </div>
                            <div className="action">
                                <FollowersModal project={project} />
                            </div>
                        </div>
                        <div className="pseudo-container">
                            <div className="avatar" style={avatar(project.posterAvatar)}></div>
                            <div>
                                <NavLink to={"/" + project.posterPseudo}>{project.posterPseudo}</NavLink>
                                <p>{dateParser(project.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default ProjectModal;